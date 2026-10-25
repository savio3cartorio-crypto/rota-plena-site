import diaryRows from "../app/data/cms/diaries.json";

export type PublicDiaryEntry = {
  id: number;
  title: string;
  body: string;
  location: string | null;
  tripDate: string | null;
  createdAt: number;
  updatedAt: number | null;
  authorName: string;
};

type DiaryRaw = { id:number; title:string; body:string; location:string|null; trip_date:string|null; created_at:number; updated_at:number|null };

const entries: PublicDiaryEntry[] = (diaryRows as DiaryRaw[])
  .map((row) => ({ id: row.id, title: row.title, body: row.body, location: row.location, tripDate: row.trip_date, createdAt: row.created_at, updatedAt: row.updated_at, authorName: "Sávio Antonio Americano" }))
  .sort((a, b) => (b.tripDate ?? "").localeCompare(a.tripDate ?? "") || b.createdAt - a.createdAt);

export async function getPublicDiaryEntries(): Promise<PublicDiaryEntry[]> {
  return entries;
}

export async function getPublicDiaryEntry(id: number): Promise<PublicDiaryEntry | null> {
  return entries.find((entry) => entry.id === id) ?? null;
}

export async function getPublicDiarySitemapEntries(): Promise<Array<{ id: number; updatedAt: number }>> {
  return entries.map((entry) => ({ id: entry.id, updatedAt: entry.updatedAt || entry.createdAt }));
}
