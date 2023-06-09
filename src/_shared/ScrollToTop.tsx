import { useEffect } from "react";
import { useLocation } from "react-router";

export const ScrollToTop = (): JSX.Element => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
