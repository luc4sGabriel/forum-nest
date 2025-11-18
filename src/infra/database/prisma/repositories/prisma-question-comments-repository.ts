import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestionCommentsRepository implements QuestionCommentRepository {
  async findById(id: string): Promise<any> {
	// TODO: implement Prisma query to find a question comment by id
	return null;
  }

  async findManyByQuestionId(questionId: string): Promise<any[]> {
	// TODO: implement Prisma query to list comments for a question
	return [];
  }

  async create(comment: any): Promise<void> {
	// TODO: implement Prisma create for question comment
  }

  async delete(comment: any): Promise<void> {
	// TODO: implement Prisma delete for question comment
  }
}