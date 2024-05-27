import { Crew } from "tmdb-ts";

export function uniqueCrew(list: Crew[]): Crew[] {
  const dict = new Map<number, Crew>();

  list.forEach((item) => {
    if (!item.profile_path) {
      return;
    }
    if (dict.has(item.id)) {
      const existingItem = dict.get(item.id);
      if (existingItem) {
        existingItem.job = existingItem.job + ", " + item.job;
      }
    } else {
      dict.set(item.id, { ...item });
    }
  });

  return Array.from(dict.values());
}
