import { Injectable, Global } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Article, Comment, ArticleCategory, ArticleType } from './article.entity';
import { GeminiError } from '../common/error';
import { ResponseCode } from '../common/utils';
import { ObjectId } from 'mongodb';

@Injectable()
@Global()
export class ArticleService {

  save(authorId: string, article: Article) {
    article.authorId = authorId;
    const obj = this.articleRepository.create(article);
    return this.articleRepository.save(obj);
  }

  async delete(id: string) {
    const article = await this.articleRepository.findOne(id);
    this.articleRepository.delete(article);
  }

  async deleteComment(id: string) {
    const comment = await this.commentRepository.findOne(id);
    this.commentRepository.delete(comment);
  }

  findById(id: string) {
    return this.articleRepository.findOne(id);
  }

  findAll() {
    return this.articleRepository.find();
  }

  findByIds(ids: ObjectId[]) {
    return this.articleRepository.findByIds(ids);
  }

  findByAuthorId(authorId: string) {
    return this.articleRepository.find({ authorId });
  }

  findByCategory(category: ArticleCategory) {
    return this.articleRepository.find({ category });
  }

  findCommentById(id: string) {
    return this.commentRepository.findOne(id);
  }

  findCommentByIds(ids: ObjectId[]) {
    return this.commentRepository.findByIds(ids);
  }

  findByArticleTypes(articleTypes: ArticleType[]) {
    return this.articleRepository.find({ where: { type: { $in: articleTypes } } });
  }

  findByUpersId(id: string) {
    return this.articleRepository.find({ where: { upersId: id } });
  }

  async updateById(authorId: string, id: string, article: Article) {
    const doc = await this.articleRepository.findOne(id, { where: { authorId } });
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in article) doc[key] = article[key];
    return this.articleRepository.save(doc);
  }

  async updateByIdWithoutUpdateDate(id: string, article: Article) {
    const doc = await this.articleRepository.update(id, article);
  }

  async updateByIdWithAdmin(id: string, article: Article) {
    const doc = await this.articleRepository.findOne(id);
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in article) doc[key] = article[key];
    return this.articleRepository.save(doc);
  }

  async updateCommentById(authorId: string, id: string, comment: Comment) {
    const doc = await this.commentRepository.findOne(id, { where: { authorId } });
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in comment) doc[key] = comment[key];
    return this.commentRepository.save(doc);
  }

  createComment(authorId: string, comment: Comment) {
    comment.authorId = authorId;
    const obj = this.commentRepository.create(comment);
    return this.commentRepository.save(obj);
  }

  search(keyword: string) {
    const regex = new RegExp(keyword, 'i');
    return this.articleRepository.find({
      where: {
        $or: [
          { title: { $regex: regex } },
          { content: { $regex: regex } }
        ]
      }
    });
  }

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: MongoRepository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: MongoRepository<Comment>
  ) { }
}
