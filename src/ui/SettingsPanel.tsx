import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { exportProgress, parseImport, save } from "../state/storage";
import type { MicaState } from "../state/storage";

interface SettingsPanelProps {
  state: MicaState;
}

// Ícono de engranaje arriba a la derecha, fijo en todas las pantallas.
// Dos acciones y nada más: exportar e importar. Sin reset visible.
export function SettingsPanel({ state }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState<MicaState | null>(null);
  const [importError, setImportError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseImport(String(reader.result ?? ""));
      if (!parsed) {
        setImportError(true);
        return;
      }
      setPendingImport(parsed);
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    if (!pendingImport) return;
    save(pendingImport);
    window.location.reload();
  };

  return (
    <>
      <button className="gear-btn" aria-label="Configuración" onClick={() => setOpen(true)}>
        ⚙️
      </button>

      {open && (
        <Modal
          title="Configuración"
          onClose={() => setOpen(false)}
          actions={
            <Button variant="ghost" small onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          }
        >
          <div className="stack">
            <Button variant="turq" onClick={() => exportProgress(state)}>
              Exportar progreso
            </Button>
            <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>
              Importar progreso
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="import-input"
              onChange={handleFile}
            />
          </div>
        </Modal>
      )}

      {pendingImport && (
        <Modal
          title="Confirmar importación"
          onClose={() => setPendingImport(null)}
          actions={
            <>
              <Button variant="ghost" small onClick={() => setPendingImport(null)}>
                Cancelar
              </Button>
              <Button small onClick={confirmImport}>
                Reemplazar
              </Button>
            </>
          }
        >
          <p>Esto reemplaza el progreso actual.</p>
        </Modal>
      )}

      {importError && (
        <Modal
          title="Archivo inválido"
          onClose={() => setImportError(false)}
          actions={
            <Button small onClick={() => setImportError(false)}>
              Entendido
            </Button>
          }
        >
          <p>Ese archivo no es un progreso de El juego de Micaela.</p>
        </Modal>
      )}
    </>
  );
}
