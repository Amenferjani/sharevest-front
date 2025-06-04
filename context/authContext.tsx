'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, userLogout } from "@/services/user/service";
import { User } from '@/types/types';
import { useRouter } from 'next/navigation';
import error from 'next/error';
import { useMutation } from '@tanstack/react-query';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setLocalUser(parsed);
        queryClient.setQueryData(['me'], parsed); // ⬅️ preload into React Query cache
      }
    }
  }, [queryClient]);

  const { data: user, isLoading, isError } = useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: getUserProfile,
    retry: false,
    enabled: typeof window !== 'undefined',
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, 
  });

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      const parsedError = JSON.parse(error.message); // Assuming error is a JSON string
      if (parsedError?.status === 401) {
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
  }, [isError, error, router]);

  const logoutMutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      localStorage.removeItem('user');
      queryClient.removeQueries({ queryKey: ['me'] });
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{
      user: user || localUser,
      isAuthenticated: !!(user || localUser),
      isLoading,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
