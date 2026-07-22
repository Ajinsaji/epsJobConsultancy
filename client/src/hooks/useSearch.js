import { useState, useCallback, useRef, useEffect } from 'react';
import { searchService } from '../services/search.service';

const cache = new Map(); // Simple short-lived cache (queryKey -> result)

export function useSearch(defaultType = 'all') {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalResults: 0, hasNextPage: false });
  const [results, setResults] = useState({ jobs: [], candidates: [], companies: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceTimeout = useRef(null);

  const buildCacheKey = (q, filters, page) => {
    return JSON.stringify({ q, filters, page, defaultType });
  };

  const search = useCallback(async (q = query, f = filters, p = pagination.page, skipCache = false) => {
    setIsLoading(true);
    setError(null);

    const cacheKey = buildCacheKey(q, f, p);

    if (!skipCache && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      setResults(cachedData.data);
      setPagination(prev => ({
        ...prev,
        page: cachedData.meta.page,
        totalResults: cachedData.meta.totalResults,
        hasNextPage: cachedData.meta.hasNextPage,
      }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await searchService.executeSearch({
        q,
        type: defaultType,
        page: p,
        limit: pagination.limit,
        ...f
      });

      setResults(response.data);
      setPagination(prev => ({
        ...prev,
        page: response.meta.page,
        totalResults: response.meta.totalResults,
        hasNextPage: response.meta.hasNextPage,
      }));

      // Set cache and expire after 60 seconds
      cache.set(cacheKey, response);
      setTimeout(() => cache.delete(cacheKey), 60000);

    } catch (err) {
      setError(err?.response?.data?.message || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, [query, filters, pagination.page, pagination.limit, defaultType]);

  const clear = useCallback(() => {
    setQuery('');
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1, totalResults: 0, hasNextPage: false }));
    setResults({ jobs: [], candidates: [], companies: [] });
  }, []);

  const refresh = useCallback(() => {
    search(query, filters, pagination.page, true);
  }, [search, query, filters, pagination.page]);

  // Debounced auto-search when query or filters change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    // Reset to page 1 if query or filters change (simplification)
    // Actually, handling page resets cleanly might require separating page from query/filters
    debounceTimeout.current = setTimeout(() => {
      search(query, filters, pagination.page);
    }, 400); // 400ms debounce

    return () => clearTimeout(debounceTimeout.current);
  }, [query, filters, pagination.page, search]);

  return {
    query,
    setQuery,
    results,
    filters,
    setFilters,
    pagination,
    setPagination,
    isLoading,
    error,
    search,
    clear,
    refresh
  };
}
