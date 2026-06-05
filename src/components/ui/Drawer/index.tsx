import { X } from "@phosphor-icons/react";

import { drawer } from "./styles";
import type { DrawerProps } from "./types";

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  const { wrapper, header, titleTag, closeButton, content } = drawer();

  return (
    <div className={wrapper({ isOpen })}>
      <div className={header()}>
        {title && <h1 className={titleTag()}>{title}</h1>}
        <button onClick={onClose} className={closeButton()}>
          Fechar
          <X />
        </button>
      </div>

      <div className={content()}>{children}</div>
    </div>
  );
}
