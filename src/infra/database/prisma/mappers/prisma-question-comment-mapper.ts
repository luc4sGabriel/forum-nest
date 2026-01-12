import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment as PrismaComment, Prisma } from "@prisma/client";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class PrismaQuestionCommentMapper {
    static toDomain(raw: PrismaComment): QuestionComment {
        // throw pq se caso ocorra esse erro, significa que o mapeamento está sendo feito de um tipo errado, comportamento nao esperado msm
        if (!raw.questionId) {
            throw new Error("Invalid comment type");
        }

        return QuestionComment.create(
            {
                content: raw.content,
                authorId: new UniqueEntityId(raw.authorId),
                questionId: new UniqueEntityId(raw.questionId),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt ? raw.updatedAt : null,
            },
            new UniqueEntityId(raw.id));
    }

    static toPrisma(questionComment: QuestionComment): Prisma.CommentUncheckedCreateInput {
        return {
            id: questionComment.id.toString(),
            authorId: questionComment.authorId.toString(),
            questionId: questionComment.questionId.toString(),
            content: questionComment.content,
            createdAt: questionComment.createdAt,
            updatedAt: questionComment.updatedAt,
        }
    }
}
