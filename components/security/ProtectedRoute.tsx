'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Loading from '../ui/loading';
import { UserRole } from '@/types/types';
import { getRedirectRoute } from '@/services/auth/service';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname()
    console.log("protected :", user);


    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated || !user?.role) {
                router.replace("/login")
                return
            }

            const roles: UserRole[] = Array.isArray(user.role)
                ? user.role.map((r: any) => r.name as UserRole)
                : []

            const allowedPath = getRedirectRoute(roles)

            if (!pathname.startsWith(allowedPath)) {
                router.replace(allowedPath)
            }
        }
    }, [user, isAuthenticated, isLoading, pathname, router])

    if (isLoading || !user) return null

    if (isLoading) return <Loading />;
    if (!isAuthenticated) return <Loading />;

    return <>{children}</>;
}
