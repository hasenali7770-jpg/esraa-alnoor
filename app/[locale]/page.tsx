import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Locale, isLocale, t } from "@/lib/i18n";
import { courses } from "@/lib/courses";
import { CourseCard } from "@/components/CourseCard";

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  const tr = t(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_20%_10%,rgba(31,91,106,0.18),transparent_60%),radial-gradient(70%_60%_at_90%_20%,rgba(212,176,116,0.20),transparent_55%)] dark:bg-[radial-gradient(80%_70%_at_20%_10%,rgba(58,166,185,0.22),transparent_60%),radial-gradient(70%_60%_at_90%_20%,rgba(212,176,116,0.14),transparent_55%)]" />
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm dark:bg-night-surface dark:text-night-text">
              {locale === "ar" ? "أكاديمية كورسات" : "Course Academy"}
              <span className="h-1 w-1 rounded-full bg-accent" />
              {locale === "ar" ? "عربي + إنكليزي" : "AR + EN"}
            </div>

            <h1 className="text-3xl font-semibold leading-tight text-ink md:text-5xl dark:text-night-text">
              {tr.hero.title}
            </h1>
            <p className="text-base leading-8 text-muted dark:text-night-muted">{tr.hero.subtitle}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/courses`}
                className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {tr.hero.ctaPrimary}
              </Link>
              <Link
                href={`/${locale}/activate`}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft transition hover:bg-bg dark:bg-night-surface dark:text-night-text dark:hover:bg-night-bg"
              >
                {tr.hero.ctaSecondary}
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-stroke bg-white p-5 text-sm leading-7 text-ink/80 shadow-soft dark:border-night-stroke dark:bg-night-surface dark:text-night-muted">
                <div className="font-semibold text-ink dark:text-night-text">{locale === "ar" ? "الدفع" : "Payments"}</div>
                <div className="mt-1">Qi Card + Zain Cash</div>
              </div>
              <div className="rounded-3xl border border-stroke bg-white p-5 text-sm leading-7 text-ink/80 shadow-soft dark:border-night-stroke dark:bg-night-surface dark:text-night-muted">
                <div className="font-semibold text-ink dark:text-night-text">{locale === "ar" ? "التفعيل" : "Activation"}</div>
                <div className="mt-1">{locale === "ar" ? "يدوي عبر كود" : "Manual via code"}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-white/60 blur-2xl dark:bg-night-surface/40" />
            <div className="overflow-hidden rounded-[2.5rem] border border-stroke bg-white shadow-soft dark:border-night-stroke dark:bg-night-surface">
              <div className="relative aspect-[4/5] w-full">
                <Image src="/hero.png" alt="Esraa Al-Noor" fill className="object-cover" priority />
              </div>
              <div className="p-5">
                <div className="text-sm font-semibold text-ink dark:text-night-text">Esraa Al-Noor</div>
                <div className="mt-1 text-sm text-muted dark:text-night-muted">
                  {locale === "ar" ? "كورسات نفسية وتطوير ذات… بهدوء وعمق." : "Psychology-inspired growth courses—calm and deep."}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-ink dark:text-night-text">{tr.featured}</h2>
            <Link
              href={`/${locale}/courses`}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-bg dark:bg-night-surface dark:text-night-text dark:hover:bg-night-bg"
            >
              {locale === "ar" ? "كل الدورات" : "All courses"}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="pb-14">
          <div className="rounded-[2rem] border border-stroke bg-white p-8 shadow-soft dark:border-night-stroke dark:bg-night-surface">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink dark:text-night-text">{tr.testimonials.title}</h3>
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted dark:text-night-muted">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {locale === "ar" ? "آراء مختصرة" : "Short reviews"}
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {tr.testimonials.items.map((it) => (
                <div key={it.name} className="rounded-3xl bg-bg p-6 text-sm leading-7 text-ink/80 dark:bg-night-bg dark:text-night-muted">
                  <div className="font-semibold text-ink dark:text-night-text">{it.name}</div>
                  <div className="mt-2">{it.text}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
