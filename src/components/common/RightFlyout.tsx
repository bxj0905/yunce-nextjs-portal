'use client';

import React from 'react';
import { createPortal } from 'react-dom';

interface RightFlyoutProps {
  button: React.ReactNode;
  children: React.ReactNode;
  offset?: number; // distance from the trigger's right edge
  className?: string; // extra classes for panel
}

const RightFlyout: React.FC<RightFlyoutProps> = ({ button, children, offset = 12, className = '' }) => {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<{ left: number; top: number } | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ left: rect.right + offset, top: rect.top });
    setOpen((v) => !v);
  };

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (btnRef.current && btnRef.current.contains(target)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open || !panelRef.current || !pos) return;
    // 确保弹窗不超出视口
    const panel = panelRef.current;
    const rect = panel.getBoundingClientRect();
    const margin = 8;
    let newTop = pos.top;
    if (newTop + rect.height + margin > window.innerHeight) {
      newTop = Math.max(margin, window.innerHeight - rect.height - margin);
    }
    if (newTop !== pos.top) setPos((p) => (p ? { ...p, top: newTop } : p));
  }, [open, pos]);

  return (
    <div className="relative">
      <button ref={btnRef} onClick={toggle} className="dropdown-toggle">
        {button}
      </button>
      {open && pos && createPortal(
        <div
          ref={panelRef}
          className={`fixed z-[90] rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark overflow-auto ${className}`}
          style={{ left: pos.left, top: pos.top, maxHeight: 'calc(100vh - 16px)' }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>,
        document.body
      )}
    </div>
  );
};

export default RightFlyout;


