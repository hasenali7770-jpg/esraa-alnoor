export type UnlockRecord = { slug: string; expiresAt?: string };

const KEY = "esraa_unlocks_v1";

export function getUnlocks(): UnlockRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isUnlocked(slug: string): boolean {
  const list = getUnlocks();
  const item = list.find((x) => x.slug === slug);
  if (!item) return false;
  if (!item.expiresAt) return true;
  return new Date(item.expiresAt).getTime() > Date.now();
}

export function addUnlock(rec: UnlockRecord) {
  const list = getUnlocks().filter((x) => x.slug !== rec.slug);
  list.push(rec);
  localStorage.setItem(KEY, JSON.stringify(list));
}
