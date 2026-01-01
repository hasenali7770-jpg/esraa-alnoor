"use client";

import {PortableText as PT} from "@portabletext/react";

export function PortableText({value}: {value: any}) {
  if (!value) return null;
  return (
    <div className="prose prose-sm max-w-none prose-headings:mt-6 prose-p:leading-8 dark:prose-invert">
      <PT value={value} />
    </div>
  );
}
