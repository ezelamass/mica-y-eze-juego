import { useState } from "react";

// Puerta trasera de testing: no vive en el estado persistido (mica.v1) para
// no arriesgar el schema real, y no aparece en ningún botón de la UI que
// vea Mica. Se activa visitando la URL con ?test=1 una vez; a partir de ahí
// queda prendida para esa pestaña vía sessionStorage.
const FLAG_KEY = "mica.testmode";

function readInitial(): boolean {
  try {
    if (new URLSearchParams(window.location.search).get("test") === "1") {
      sessionStorage.setItem(FLAG_KEY, "1");
      return true;
    }
    return sessionStorage.getItem(FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function useTestMode(): [boolean, () => void] {
  const [testMode] = useState(readInitial);

  const exitTestMode = () => {
    try {
      sessionStorage.removeItem(FLAG_KEY);
    } catch {
      // localStorage/sessionStorage puede no estar disponible (privado, etc.)
    }
    window.location.href = window.location.pathname;
  };

  return [testMode, exitTestMode];
}
