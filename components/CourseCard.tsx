import Link from "next/link";
import Image from "next/image";
import { Course, formatIQD } from "@/lib/courses";
import { Locale, t } from "@/lib/i18n";

type CourseLike =
  | Course
  | (Omit<Course, "cover"> & {
      // دعم الداتا الجديدة القادمة من Sanity
      coverImageUrl?: string | null;
      cover?: string; // احتياط
      hoursMin?: number;
    });

export function CourseCard({ course, locale }: { course: CourseLike; locale: Locale }) {
  const tr = t(locale);

  const title = course.title?.[locale] || (locale === "ar" ? "بدون عنوان" : "Untitled");
  const short = course.short?.[locale] || "";

  // ✅ أهم تعديل: دعم coverImageUrl القادم من Sanity
  const cover =
    (course as any).coverImageUrl ||
    (course as any).cover ||
    "https://placehold.co/1200x600/png?text=Course";

  const price = typeof (course as any).priceIQD === "number" ? (course as any).priceIQD : 0;
  const hoursMin = typeof (course as any).hoursMin === "number" ? (course as any).hoursMin : 0;

  const tags = Array.isArray(course.tags?.[locale]) ? course.tags[locale] : [];

  return (
    <div className="group overflow-hidden rounded-3xl border border-stroke bg-white shadow-soft transition hover:-translate-y-0.5 dark:border-night-stroke dark:bg-night-surface">
      <div className="relative h-44 w-full">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover"
          // ✅ حتى لو رابط الصورة خارجي (Sanity CDN)
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />

        <div className="absolute bottom-3 left-3 rounded-2xl bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur dark:bg-night-bg/70 dark:text-night-text">
          {formatIQD(price, locale)}
        </div>
      </div>

      <div className="p-5">
        <div className="text-lg font-semibold text-ink dark:text-night-text">{title}</div>
        <p className="mt-2 text-sm leading-7 text-muted dark:text-night-muted">{short}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg px-3 py-1 text-xs text-ink/80 dark:bg-night-bg dark:text-night-text/90"
            >
              {tag}
            </span>
          ))}

          <span className="rounded-full bg-brand px-3 py-1 text-xs text-white dark:bg-brand-500">
            {tr.duration}: {hoursMin}+ {tr.hours}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`/${locale}/courses/${(course as any).slug}`}
            className="rounded-2xl bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95 dark:bg-white dark:text-night-bg"
          >
            {tr.view}
          </Link>

          <Link
            href={`/${locale}/activate`}
            className="rounded-2xl px-4 py-2 text-sm font-semibold text-brand transition hover:bg-bg dark:text-brand-200 dark:hover:bg-night-bg"
          >
            {tr.buy}
          </Link>
        </div>
      </div>
    </div>
  );
}
