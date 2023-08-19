import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNavigateTo() {
  const navigate = useNavigate();
  const navigateTo = useCallback(
    (path: string, params?: any) => {
      navigate(path, { state: params });
      console.log('Redirecting...');
    },
    [navigate]
  );
  return navigateTo;
}
