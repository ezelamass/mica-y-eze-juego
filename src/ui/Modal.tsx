import type { ReactNode, MouseEvent } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, actions, onClose }: ModalProps) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={stop}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <h3>{title}</h3>
        <div>{children}</div>
        {actions && <div className="btn-row">{actions}</div>}
      </div>
    </div>
  );
}
