const pages: Record<string, string> = {};

export function saveTempPage(id: string, html: string) {
  pages[id] = html;
}

export function getTempPage(id: string): string | null {
  return pages[id] || null;
}

export function deleteTempPage(id: string) {
  delete pages[id];
}
