export const COURSES_QUERY = `*[_type=="course" && published==true] | order(sortOrder asc, _createdAt desc) {
  "slug": slug.current,
  titleAr, titleEn, shortAr, shortEn, priceIQD, hoursMin, tagsAr, tagsEn,
  "coverUrl": cover.asset->url
}`;

export const COURSE_BY_SLUG_QUERY = `*[_type=="course" && slug.current==$slug][0]{
  "slug": slug.current,
  titleAr, titleEn, shortAr, shortEn, detailsAr, detailsEn, priceIQD, hoursMin, tagsAr, tagsEn,
  "coverUrl": cover.asset->url
}`;

export const LESSONS_BY_COURSE_QUERY = `*[_type=="lesson" && course->slug.current==$slug] | order(order asc){
  titleAr, titleEn, order, videoUrl, durationMin, "posterUrl": poster.asset->url
}`;
