import type { Route } from "../router";

const ITEMS: { route: Route; label: string; icon: string }[] = [
  { route: "/", label: "Inicio", icon: "🏠" },
  { route: "/mapa", label: "Mapa", icon: "🗺️" },
  { route: "/tienda", label: "Tienda", icon: "🎁" },
];

interface BottomNavProps {
  route: Route;
  onNavigate: (to: Route) => void;
}

export function BottomNav({ route, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {ITEMS.map((item) => (
        <button
          key={item.route}
          type="button"
          className={`bottom-nav-item ${route === item.route ? "active" : ""}`}
          aria-current={route === item.route ? "page" : undefined}
          onClick={() => onNavigate(item.route)}
        >
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
