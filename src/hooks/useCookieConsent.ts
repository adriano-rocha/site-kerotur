import { useState, useEffect, useCallback } from "react";

export type CookieConsentStatus = "accepted" | "rejected" | "pending";

const STORAGE_KEY = "kerotur_cookie_consent";

/**
 * Hook que gerencia o consentimento de cookies (LGPD).
 * Persiste a escolha do usuário no localStorage.
 *
 * Uso:
 *   const { status, accept, reject } = useCookieConsent()
 *   if (status === "pending") { mostrar banner }
 */
export function useCookieConsent() {
  const [status, setStatus] = useState<CookieConsentStatus>("pending");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "rejected") {
        setStatus(stored);
      }
    } catch {
      // localStorage indisponível (modo privado, etc.) — mantém "pending"
    }
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignora falha de storage
    }
    setStatus("accepted");
  }, []);

  const reject = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {
      // ignora falha de storage
    }
    setStatus("rejected");
  }, []);

  return { status, accept, reject };
}