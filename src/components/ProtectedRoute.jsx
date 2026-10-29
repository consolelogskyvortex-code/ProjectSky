import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let active = true;

    const checkAccess = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          if (active) setStatus('denied');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (active) setStatus(!profileError && profile?.role === 'admin' ? 'allowed' : 'denied');
      } catch {
        if (active) setStatus('denied');
      }
    };

    checkAccess();
    return () => { active = false; };
  }, []);

  if (status === 'checking') {
    return <div className="min-h-screen flex items-center justify-center text-gray-300" role="status">Memeriksa akses admin…</div>;
  }
  if (status !== 'allowed') return <Navigate to="/login" replace />;
  return children;
}
