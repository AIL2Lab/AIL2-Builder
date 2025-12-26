"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  msg: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((msg: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      remove(id);
    }, 3000);
  }, [remove]);

  return { toasts, show, remove };
};

export const ToastContainer = ({
  toasts,
  remove,
}: {
  toasts: Toast[];
  remove: (id: number) => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || toasts.length === 0) return null;
  return createPortal(
    <div className="fixed top-5 left-1/2 z-[9999] flex w-full max-w-xs -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => remove(t.id)}
          className={`
            w-full cursor-pointer rounded-md px-4 py-3 text-center text-sm text-white shadow-lg transition-all animate-in slide-in-from-top fade-in duration-300
            ${t.type === "success" ? "bg-green-500" : ""}
            ${t.type === "error" ? "bg-red-500" : ""}
            ${t.type === "info" ? "bg-gray-800" : ""}
          `}
        >
          {t.msg}
        </div>
      ))}
    </div>,
    document.body
  );
};