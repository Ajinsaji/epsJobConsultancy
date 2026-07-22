import { useState, useCallback, useEffect, useRef } from 'react';
import { communicationService } from '../services/communication.service';
import { useAuth } from '../contexts/AuthContext';

export function useCommunication(pollIntervalMs = 30000) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    try {
      const { data } = await communicationService.listConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
  }, []);

  const loadConversation = useCallback(async (conversationId) => {
    try {
      setIsMessagesLoading(true);
      const { data } = await communicationService.getMessages(conversationId);
      // Backend returns latest first, UI needs chronological (oldest top, newest bottom)
      setMessages(data.reverse()); 
      setCurrentConversation(conversationId);
      
      // Mark as read
      await communicationService.markAsRead(conversationId);
      
      // Update local unread count
      setConversations(prev => 
        prev.map(c => 
          c._id === conversationId 
            ? { 
                ...c, 
                unreadCounts: { ...c.unreadCounts, [user?._id]: 0 } 
              } 
            : c
        )
      );

    } catch (err) {
      console.error('Failed to load conversation:', err);
    } finally {
      setIsMessagesLoading(false);
    }
  }, [user]);

  const sendMessage = useCallback(async (body, attachments = []) => {
    if (!currentConversation) return;
    try {
      // Optimistic update
      const tempMessage = {
        _id: 'temp-' + Date.now(),
        conversationId: currentConversation,
        senderId: { _id: user?._id },
        body,
        attachments,
        createdAt: new Date().toISOString(),
        status: 'Sent'
      };
      setMessages(prev => [...prev, tempMessage]);

      const { data } = await communicationService.sendMessage(currentConversation, body, attachments);
      
      // Replace temp with actual
      setMessages(prev => prev.map(m => m._id === tempMessage._id ? data : m));
      
      // Refresh conversation list to bump it to top
      fetchConversations();
    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove temp message on fail
      fetchConversations();
      loadConversation(currentConversation);
    }
  }, [currentConversation, fetchConversations, loadConversation, user]);

  const startConversation = useCallback(async (participants, type, relatedEntity) => {
    try {
      const { data } = await communicationService.startConversation(participants, type, relatedEntity);
      await fetchConversations();
      await loadConversation(data._id);
      return data;
    } catch (err) {
      console.error('Failed to start conversation:', err);
      throw err;
    }
  }, [fetchConversations, loadConversation]);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    fetchConversations().finally(() => setIsLoading(false));
  }, [fetchConversations]);

  // Polling for active conversation and list
  useEffect(() => {
    if (pollIntervalMs > 0) {
      const interval = setInterval(() => {
        // Only fetch if document is visible to save resources
        if (!document.hidden) {
          fetchConversations();
          if (currentConversation) {
            // Fetch latest messages for active convo without wiping state (silent fetch)
            communicationService.getMessages(currentConversation)
              .then(({ data }) => {
                setMessages(data.reverse());
              })
              .catch(console.error);
          }
        }
      }, pollIntervalMs);
      return () => clearInterval(interval);
    }
  }, [pollIntervalMs, currentConversation, fetchConversations]);

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    isMessagesLoading,
    sendMessage,
    loadConversation,
    startConversation,
    refresh: fetchConversations
  };
}
