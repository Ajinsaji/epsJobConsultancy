import { useState, useCallback, useEffect, useRef } from 'react';
import { notificationService } from '../services/notification.service';

export function useNotifications(pollIntervalMs = 60000) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, hasNextPage: false });
  
  const isFetchingRef = useRef(false);

  const fetchNotifications = useCallback(async (page = 1, append = false) => {
    if (isFetchingRef.current) return;
    
    try {
      isFetchingRef.current = true;
      if (!append) setIsLoading(true);
      
      const { data, meta } = await notificationService.getNotifications(page, pagination.limit);
      
      setNotifications(prev => append ? [...prev, ...data] : data);
      setPagination(prev => ({ ...prev, page: meta.page, hasNextPage: meta.hasNextPage }));
      
      // Update unread count based on the fetched data (or just fetch it separately)
      const unreadData = await notificationService.getUnreadCount();
      setUnreadCount(unreadData.data.count);
      
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [pagination.limit]);

  const refresh = useCallback(() => {
    return fetchNotifications(1, false);
  }, [fetchNotifications]);

  const fetchNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      fetchNotifications(pagination.page + 1, true);
    }
  }, [pagination.hasNextPage, pagination.page, fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  }, []);

  // Polling mechanism
  useEffect(() => {
    refresh(); // Initial fetch
    
    if (pollIntervalMs > 0) {
      const interval = setInterval(() => {
        // Just refresh unread count silently
        notificationService.getUnreadCount()
          .then(res => setUnreadCount(res.data.count))
          .catch(console.error);
      }, pollIntervalMs);
      
      return () => clearInterval(interval);
    }
  }, [refresh, pollIntervalMs]);

  return {
    notifications,
    unreadCount,
    isLoading,
    hasNextPage: pagination.hasNextPage,
    markAsRead,
    markAllAsRead,
    refresh,
    fetchNextPage
  };
}
