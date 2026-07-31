'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { apiClient } from '../lib/api-client';


export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'OWNER' | 'ADMIN';
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = Cookies.get('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiClient.get('/users/me');
        setUser(res.data?.data || res.data);
      } catch (err) {
        Cookies.remove('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    window.location.href = '/login';
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };
}