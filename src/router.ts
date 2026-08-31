import { useEffect, useState } from "react";

// Router minimalista a propósito: 3 pantallas fijas, sin librería. Usa la
// history API directamente en vez de react-router para no sumar una
// dependencia a un proyecto que se define como "sin router" en el resto de
// sus decisiones de stack.
export type Route = "/" | "/mapa" | "/tienda";

const VALID_ROUTES: Route[] = ["/", "/mapa", "/tienda"];

function normalize(pathname: string): Route {
  return (VALID_ROUTES as string[]).includes(pathname) ? (pathname as Route) : "/";
}

export function useRoute(): [Route, (to: Route) => void] {
  const [route, setRoute] = useState<Route>(() => normalize(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(normalize(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to: Route) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, "", to);
    }
    setRoute(to);
    window.scrollTo(0, 0);
  };

  return [route, navigate];
}
