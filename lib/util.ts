const REGEX_BACKTICK = /’/g

export function normalizeString(x: string) {
  const words: string[] = []
  x = x.replace(REGEX_BACKTICK, "'")
  x.split(' ').forEach((word) => {
    if (word !== '') words.push(word)
  })
  const res = words.join(' ')
  return res
}
