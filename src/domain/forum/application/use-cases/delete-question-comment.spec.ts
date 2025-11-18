import { expect } from 'vitest'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryQuestionsCommentRepository: InMemoryQuestionsCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete A Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentRepository =
      new InMemoryQuestionsCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsCommentRepository)
  })

  it('should be able to delete a comment on a question', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionsCommentRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })
    expect(inMemoryQuestionsCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('truly-author'),
    })

    await inMemoryQuestionsCommentRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'fake-author',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
