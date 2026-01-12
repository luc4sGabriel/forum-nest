import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment as PrismaComment, Prisma } from "@prisma/client";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class PrismaAnswerCommentMapper {
    static toDomain(raw: PrismaComment): AnswerComment {
        // throw pq se caso ocorra esse erro, significa que o mapeamento está sendo feito de um tipo errado, comportamento nao esperado msm
        if (!raw.answerId) {
            throw new Error("Invalid comment type");
        }

        return AnswerComment.create(
            {
                content: raw.content,
                authorId: new UniqueEntityId(raw.authorId),
                answerId: new UniqueEntityId(raw.answerId),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt ? raw.updatedAt : null,
            },
            new UniqueEntityId(raw.id));
    }

    static toPrisma(answerComment: AnswerComment): Prisma.CommentUncheckedCreateInput {
        return {
            id: answerComment.id.toString(),
            authorId: answerComment.authorId.toString(),
            answerId: answerComment.answerId.toString(),
            content: answerComment.content,
            createdAt: answerComment.createdAt,
            updatedAt: answerComment.updatedAt,
        }
    }
}
