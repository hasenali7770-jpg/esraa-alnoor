import Link from "next/link";
import Image from "next/image";
import { Locale, t } from "@/lib/i18n";
import { formatIQD } from "@/lib/courses";

type CmsCourse = {
  _id: string;
  slug?: string | null;
  title?: { ar?: string; en?: string } | null;
  short?: { ar?: string; en?: string } | null;
  priceIQD?: number | null;
  tags?: { ar?: string[]; en?: string[] } | null;
  coverImageUrl?: string | null;
};

function safeSlug(input: string) {
  return (input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-+/g, "-");
}

export function CourseCard({ course, locale }: { course: CmsCourse; locale: Locale }) {
  const tr = t(locale);

  const title =
    course.title?.[locale]?.trim() ||
    course.title?.[locale === "ar" ? "en" : "ar"]?.trim() ||
    (locale === "ar" ? "بدون عنوان" : "Untitled");

  const short = course.short?.[locale]?.trim() || "";
  const tags = Array.isArray(course.tags?.[locale]) ? course.tags![locale]! : [];

  const img =
    course.coverImageUrl && course.coverImageUrl.startsWith("http")
      ? course.coverImageUrl
      : "https://dummyimage.com/1200x700/eee/111.jpg&text=Course";

  const price = typeof course.priceIQD === "number" ? course.priceIQD : 0;

  // إذا slug فاضي، نولده من العنوان (حتى ما تخرب صفحة التفاصيل)
  const slug = (course.slug && course.slug.trim()) ? course.slug.trim() : safeSlug(title);

  return (
    <div className="group overflow-hidden rounded-3xl border border-stroke bg-white shadow-soft transition hover:-translate-y-0.5 dark:border-night-stroke dark:bg-night-surface">
      <div className="relative h-44 w-full">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
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
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`/${locale}/courses/${slug}`}
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
