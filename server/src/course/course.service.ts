import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { MongoRepository } from 'typeorm';
import { GeminiError } from '../common/error';
import { ResponseCode } from '../common/utils';
import { Comment } from '../article/article.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class CourseService {

  save(authorId: string, course: Course) {
    course.authorId = authorId;
    const obj = this.courseRepository.create(course);
    return this.courseRepository.save(obj);
  }

  createComment(authorId: string, comment: Comment) {
    comment.authorId = authorId;
    const obj = this.commentRepository.create(comment);
    return this.commentRepository.save(obj);
  }

  async delete(authorId: string, courseId: string) {
    const course = await this.courseRepository.findOne(courseId, { where: { authorId } });
    this.courseRepository.delete(course);
  }

  findById(id: string) {
    return this.courseRepository.findOne(id);
  }

  findAll() {
    return this.courseRepository.find();
  }

  findByIds(ids: ObjectId[]) {
    return this.courseRepository.findByIds(ids);
  }

  async updateById(authorId: string, id: string, course: Course) {
    const doc = await this.courseRepository.findOne(id, { where: { authorId } });
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in course) doc[key] = course[key];
    return this.courseRepository.save(doc);
  }

  async updateByIdWithAdmin(id: string, course: Course) {
    const doc = await this.courseRepository.findOne(id);
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in course) doc[key] = course[key];
    return this.courseRepository.save(doc);
  }

  search(keyword: string) {
    const regex = new RegExp(keyword, 'i');
    return this.courseRepository.find({
      where: {
        $or: [
          { title: { $regex: regex } },
          { decs: { $regex: regex } }
        ]
      }
    });
  }

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: MongoRepository<Course>,
    @InjectRepository(Comment)
    private readonly commentRepository: MongoRepository<Comment>
  ) {
  }
}
