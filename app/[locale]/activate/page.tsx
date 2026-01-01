"use client";

import {useState} from "react";
import {Container} from "@/components/Container";
import {Locale, isLocale, t} from "@/lib/i18n";
import {addUnlock} from "@/lib/unlock";

export default function ActivatePage({params}: {params: {locale: string}}) {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  const tr = t(locale);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type: "ok" | "err"; text: string} | null>(null);

  async function submit() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({code}),
      });
      const data = await res.json();
      if (!data.ok) {
        setMsg({type: "err", text: data.message || (locale === "ar" ? "فشل التفعيل" : "Activation failed")});
      } else {
        addUnlock({slug: data.courseSlug, expiresAt: data.expiresAt || undefined});
        setMsg({type: "ok", text: locale === "ar" ? "تم فتح الوصول بنجاح ✅" : "Access unlocked ✅"});
      }
    } catch {
      setMsg({type: "err", text: locale === "ar" ? "حصل خطأ بالشبكة" : "Network error"});
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold text-ink dark:text-night-text">{tr.activation.title}</h1>
      <p className="mt-2 text-sm leading-7 text-muted dark:text-night-muted">{tr.activation.subtitle}</p>

      <div className="mt-6 max-w-xl rounded-3xl border border-stroke bg-white p-7 shadow-soft dark:border-night-stroke dark:bg-night-surface">
        <label className="text-sm font-semibold text-ink dark:text-night-text">{tr.activation.label}</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={locale === "ar" ? "مثال: ESRAA-1234" : "e.g. ESRAA-1234"}
          className="mt-3 w-full rounded-2xl border border-stroke bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/20 dark:border-night-stroke dark:bg-night-bg dark:text-night-text"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-4 w-full rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? (locale === "ar" ? "جاري التفعيل..." : "Activating...") : tr.activation.button}
        </button>

        <div className="mt-3 text-xs text-muted dark:text-night-muted">{tr.activation.hint}</div>

        {msg && (
          <div
            className={`mt-4 rounded-2xl p-4 text-sm ${
              msg.type === "ok"
                ? "bg-bg text-ink dark:bg-night-bg dark:text-night-text"
                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-200"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>
    </Container>
  );
}
