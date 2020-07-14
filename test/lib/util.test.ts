import { normalizeString } from '../../lib/util'

test('lib/util/normalizeString', () => {
  expect(normalizeString('hello   WOrld')).toBe('HELLO WORLD')
  expect(normalizeString('I is A    pEn!')).toBe('I IS A PEN!')
})
