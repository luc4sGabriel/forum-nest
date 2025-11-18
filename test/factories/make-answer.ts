import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      questionId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )

  return answer
}
