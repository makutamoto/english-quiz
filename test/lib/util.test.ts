import { normalizeString } from '../../lib/util'

test('lib/util/normalizeString', () => {
  expect(normalizeString('hello   WOrld').toUpperCase()).toBe('HELLO WORLD')
  expect(normalizeString('I is A    pEn!').toUpperCase()).toBe('I IS A PEN!')
})
