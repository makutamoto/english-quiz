export function normalizeString(x: string) {
  const words: string[] = []
  x.split(' ').forEach((word) => {
    if (word !== '') words.push(word.toUpperCase())
  })
  const res = words.join(' ')
  return res
}
