export async function fetchJson(url: string) {
  return await fetch(url).then((res) => res.json())
}
