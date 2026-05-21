import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getCurrentUser } from "@/lib/auth";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  requirePaid?: boolean;
  requireAdmin?: boolean;
  [key: string]: any;
}

export function ProtectedRoute({ 
  component: Component, 
  requirePaid = false, 
  requireAdmin = false, 
  ...rest 
}: ProtectedRouteProps) {
  const [location, setLocation] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const user = getCurrentUser();
      
      if (!user) {
        setLocation("/login");
        return;
      }

      if (requireAdmin && !user.isAdmin) {
        setLocation("/dashboard");
        return;
      }

      if (requirePaid && !user.hasPaid) {
        setLocation("/payment");
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [location, setLocation, requirePaid, requireAdmin]);

  if (isAuthorized === null) {
    return <div className="min-h-screen flex items-center justify-center">Učitavanje...</div>;
  }

  return <Component {...rest} />;
}
