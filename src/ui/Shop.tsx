import { useState } from "react";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { availableGifts, availableTreats, availableCitas } from "../state/engine";
import { CITA_PRICE } from "../data/shop";
import type { MicaState } from "../state/storage";
import type { ShopItemId } from "../data/shop";
import type { Place } from "../data/places";

type PendingPurchase =
  | { kind: "item"; id: ShopItemId; name: string; price: number }
  | { kind: "cita"; place: Place };

interface ShopProps {
  state: MicaState;
  onBuyItem: (id: ShopItemId) => void;
  onBuyCita: (placeId: string) => void;
}

export function Shop({ state, onBuyItem, onBuyCita }: ShopProps) {
  const [pending, setPending] = useState<PendingPurchase | null>(null);

  const gifts = availableGifts(state);
  const treats = availableTreats();
  const citas = availableCitas(state);
  const nothingLeft = gifts.length === 0 && treats.length === 0 && citas.length === 0;

  const confirm = () => {
    if (!pending) return;
    if (pending.kind === "item") onBuyItem(pending.id);
    else onBuyCita(pending.place.id);
    setPending(null);
  };

  return (
    <Card>
      <h2>Tienda</h2>
      <p className="dim">Se compra cuando quieran. Se puede guardar para algo más caro.</p>
      <div className="shop-list" style={{ marginTop: 14 }}>
        {gifts.map((item) => (
          <div className="shop-item" key={item.id}>
            <div className="name">
              {item.name}
              {item.description && <em>{item.description}</em>}
            </div>
            <button
              className="buy-btn"
              disabled={state.coins < item.price}
              onClick={() =>
                setPending({ kind: "item", id: item.id, name: item.name, price: item.price })
              }
            >
              {item.price}
            </button>
          </div>
        ))}
        {citas.map((place) => (
          <div className="shop-item" key={place.id}>
            <div className="name">
              Cita sorpresa
              <em>{place.name}</em>
            </div>
            <button
              className="buy-btn"
              disabled={state.coins < CITA_PRICE}
              onClick={() => setPending({ kind: "cita", place })}
            >
              {CITA_PRICE}
            </button>
          </div>
        ))}
        {treats.map((item) => (
          <div className="shop-item" key={item.id}>
            <div className="name">
              {item.name}
              {item.description && <em>{item.description}</em>}
            </div>
            <button
              className="buy-btn"
              disabled={state.coins < item.price}
              onClick={() =>
                setPending({ kind: "item", id: item.id, name: item.name, price: item.price })
              }
            >
              {item.price}
            </button>
          </div>
        ))}
        {nothingLeft && <p className="shop-empty">No queda nada más por ahora.</p>}
      </div>

      {pending && (
        <Modal
          title="Confirmar compra"
          onClose={() => setPending(null)}
          actions={
            <>
              <Button variant="ghost" small onClick={() => setPending(null)}>
                Cancelar
              </Button>
              <Button small onClick={confirm}>
                Confirmar
              </Button>
            </>
          }
        >
          <p>
            {pending.kind === "item"
              ? `¿Comprar "${pending.name}" por ${pending.price} monedas?`
              : `¿Canjear la cita sorpresa a ${pending.place.name} por ${CITA_PRICE} monedas?`}
          </p>
        </Modal>
      )}
    </Card>
  );
}
