import { SearchService } from '../services/search.service.js';

export const globalSearch = async (req, res, next) => {
  try {
    const startTime = Date.now();

    const { 
      q = '', 
      type = 'all', 
      page = 1, 
      limit = 10, 
      ...filters 
    } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));
    
    // Convert type comma separated string to array
    const types = type.split(',').map(t => t.trim().toLowerCase());

    const { data, totalResults } = await SearchService.executeSearch(
      q, 
      types, 
      filters, 
      parsedPage, 
      parsedLimit
    );

    const executionTime = Date.now() - startTime;
    const hasNextPage = (parsedPage * parsedLimit) < totalResults;

    res.status(200).json({
      success: true,
      message: 'Search completed',
      data,
      meta: {
        query: q,
        executionTime,
        page: parsedPage,
        limit: parsedLimit,
        totalResults,
        hasNextPage
      }
    });

  } catch (error) {
    next(error);
  }
};

export const searchSuggestions = async (req, res, next) => {
  try {
    // For Version 1.0, suggestions can just be a fast, limited query against the same service 
    // or return static trending terms if query is empty.
    const { q = '' } = req.query;

    if (!q || q.length < 2) {
      return res.status(200).json({
        success: true,
        data: ['React', 'Node.js', 'Frontend Developer', 'Remote']
      });
    }

    // A fast query just against job titles
    const { data } = await SearchService.executeSearch(q, ['jobs'], {}, 1, 5);
    const suggestions = data.jobs.map(j => j.title);

    res.status(200).json({
      success: true,
      data: [...new Set(suggestions)] // Ensure unique
    });
  } catch (error) {
    next(error);
  }
};
