// hooks/useRouteChangeGuard.ts
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useRouteChangeGuard(blockOn: string[]) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const pendingPath = useRef<string | null>(null);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Allow navigation if user confirms
  const confirmNavigation = () => {
    setShowModal(false);
    if (pendingPath.current) {
      navigate(pendingPath.current);
      pendingPath.current = null;
    }
  };

  // Cancel navigation
  const cancelNavigation = () => {
    setShowModal(false);
    pendingPath.current = null;
  };

  useEffect(() => {
    const unlisten = () => {
      const shouldBlock = blockOn.some((path) => currentPath.includes(path));

      if (location.pathname !== currentPath && shouldBlock) {
        pendingPath.current = location.pathname;
        setShowModal(true);
        // Revert to current path so that navigation is blocked visually
        window.history.pushState({}, "", currentPath);
      } else {
        setCurrentPath(location.pathname);
      }
    };

    window.addEventListener("popstate", unlisten);
    return () => {
      window.removeEventListener("popstate", unlisten);
    };
  }, [location.pathname, blockOn, currentPath]);

  return { showModal, confirmNavigation, cancelNavigation };
}
