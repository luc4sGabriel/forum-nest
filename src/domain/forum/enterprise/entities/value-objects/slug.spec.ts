import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('This is a slug')

  expect(slug.value).toEqual('this-is-a-slug')
})
