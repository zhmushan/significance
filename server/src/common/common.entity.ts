import { Entity, MongoRepository, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { scheduleJob } from 'node-schedule';
import { WatchTag, User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { config } from '../config';

@Entity()
@Injectable()
export class Common extends BaseEntity {

  @Column()
  tagsInfo: {};

  @Column()
  issueReplyNumWeekly: {};

  @Column()
  issueReplyNumTotally: {};

  @Column()
  userApprovedNumByTags: {};

  @Column()
  articleUpNumWeekly: {};

  @Column()
  articleUpNumMonthly: {};

  create(obj = {}) {
    return this.commonRepository.create(obj);
  }

  save(common: Common) {
    return this.commonRepository.save(common) as Promise<Common>;
  }

  async get() {
    const commonData = await this.commonRepository.findOne();
    if (!commonData) return this.save(this.create());
    return commonData;
  }

  async increaseIssueReplyNum(id: string) {
    const commonData = await this.get();
    commonData.issueReplyNumWeekly[id] = ++commonData.issueReplyNumWeekly[id] || 1;
    commonData.issueReplyNumTotally[id] = ++commonData.issueReplyNumTotally[id] || 1;
    this.save(commonData);
  }

  async emptyIssueReplyNumWeekly() {
    const commonData = await this.get();
    commonData.issueReplyNumWeekly = {};
    this.save(commonData);

    const keys = Object.keys(commonData.issueReplyNumWeekly)
      .sort(
        (key1, key2) =>
          commonData.issueReplyNumWeekly[key2] - commonData.issueReplyNumWeekly[key1]
      );
    if (keys[0]) this.userService.addIntegral(keys[0], config.integral.issue.weekRank.first);
    if (keys[1]) this.userService.addIntegral(keys[1], config.integral.issue.weekRank.second);
    if (keys[2]) this.userService.addIntegral(keys[2], config.integral.issue.weekRank.third);
    if (keys[3]) this.userService.addIntegral(keys[3], config.integral.issue.weekRank.fourthTOTenth);
    if (keys[4]) this.userService.addIntegral(keys[4], config.integral.issue.weekRank.fourthTOTenth);
    if (keys[5]) this.userService.addIntegral(keys[5], config.integral.issue.weekRank.fourthTOTenth);
    if (keys[6]) this.userService.addIntegral(keys[6], config.integral.issue.weekRank.fourthTOTenth);
    if (keys[7]) this.userService.addIntegral(keys[7], config.integral.issue.weekRank.fourthTOTenth);
    if (keys[8]) this.userService.addIntegral(keys[8], config.integral.issue.weekRank.fourthTOTenth);
    if (keys[9]) this.userService.addIntegral(keys[9], config.integral.issue.weekRank.fourthTOTenth);
  }

  async increaseUserApprovedNumByTags(tags: WatchTag[], userId: string) {
    const commonData = await this.get();
    tags.forEach(t => {
      if (!commonData.userApprovedNumByTags[t]) commonData.userApprovedNumByTags[t] = {};
      commonData.userApprovedNumByTags[t][userId] = ++commonData.userApprovedNumByTags[t][userId] || 1;
    });
    this.save(commonData);
  }

  async decreaseUserApprovedNumByTags(tags: WatchTag[], userId: string) {
    const commonData = await this.get();
    tags.forEach(t => {
      if (!commonData.userApprovedNumByTags[t]) commonData.userApprovedNumByTags[t] = {};
      commonData.userApprovedNumByTags[t][userId] = --commonData.userApprovedNumByTags[t][userId] || 0;
    });
    this.save(commonData);
  }

  async increaseArticleUpNum(id: string) {
    const commonData = await this.get();
    commonData.articleUpNumWeekly[id] = ++commonData.articleUpNumWeekly[id] || 1;
    commonData.articleUpNumMonthly[id] = ++commonData.articleUpNumMonthly[id] || 1;
    this.save(commonData);
  }

  async emptyArticleUpNumWeekly() {
    const commonData = await this.get();
    commonData.articleUpNumWeekly = {};
    this.save(commonData);

    const keys = Object.keys(commonData.articleUpNumWeekly)
      .sort(
        (key1, key2) =>
          commonData.articleUpNumWeekly[key2] - commonData.articleUpNumWeekly[key1]
      );
    if (keys[0]) this.userService.addIntegral(keys[0], config.integral.article.weekRank.first);
    if (keys[1]) this.userService.addIntegral(keys[1], config.integral.article.weekRank.second);
    if (keys[2]) this.userService.addIntegral(keys[2], config.integral.article.weekRank.third);
    if (keys[3]) this.userService.addIntegral(keys[3], config.integral.article.weekRank.fourthTOTenth);
    if (keys[4]) this.userService.addIntegral(keys[4], config.integral.article.weekRank.fourthTOTenth);
    if (keys[5]) this.userService.addIntegral(keys[5], config.integral.article.weekRank.fourthTOTenth);
    if (keys[6]) this.userService.addIntegral(keys[6], config.integral.article.weekRank.fourthTOTenth);
    if (keys[7]) this.userService.addIntegral(keys[7], config.integral.article.weekRank.fourthTOTenth);
    if (keys[8]) this.userService.addIntegral(keys[8], config.integral.article.weekRank.fourthTOTenth);
    if (keys[9]) this.userService.addIntegral(keys[9], config.integral.article.weekRank.fourthTOTenth);
  }

  async emptyArticleUpNumMonthly() {
    const commonData = await this.get();
    commonData.articleUpNumMonthly = {};
    this.save(commonData);

    const keys = Object.keys(commonData.articleUpNumMonthly)
      .sort(
        (key1, key2) =>
          commonData.articleUpNumMonthly[key2] - commonData.articleUpNumMonthly[key1]
      );
    if (keys[0]) this.userService.addIntegral(keys[0], config.integral.article.monthRank.first);
    if (keys[1]) this.userService.addIntegral(keys[1], config.integral.article.monthRank.second);
    if (keys[2]) this.userService.addIntegral(keys[2], config.integral.article.monthRank.third);
    if (keys[3]) this.userService.addIntegral(keys[3], config.integral.article.monthRank.fourthTOTenth);
    if (keys[4]) this.userService.addIntegral(keys[4], config.integral.article.monthRank.fourthTOTenth);
    if (keys[5]) this.userService.addIntegral(keys[5], config.integral.article.monthRank.fourthTOTenth);
    if (keys[6]) this.userService.addIntegral(keys[6], config.integral.article.monthRank.fourthTOTenth);
    if (keys[7]) this.userService.addIntegral(keys[7], config.integral.article.monthRank.fourthTOTenth);
    if (keys[8]) this.userService.addIntegral(keys[8], config.integral.article.monthRank.fourthTOTenth);
    if (keys[9]) this.userService.addIntegral(keys[9], config.integral.article.monthRank.fourthTOTenth);
  }

  repository() {
    return this.commonRepository;
  }

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.tagsInfo) this.tagsInfo = {};
    if (!this.issueReplyNumWeekly) this.issueReplyNumWeekly = {};
    if (!this.issueReplyNumTotally) this.issueReplyNumTotally = {};
    if (!this.userApprovedNumByTags) this.userApprovedNumByTags = {};
    if (!this.articleUpNumWeekly) this.articleUpNumWeekly = {};
    if (!this.articleUpNumMonthly) this.articleUpNumMonthly = {};
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }

  constructor(
    @InjectRepository(Common)
    private readonly commonRepository: MongoRepository<Common>,
    @InjectRepository(User)
    private readonly userService: UserService
  ) {
    super();
    // scheduleJob('0 0 0 * * 1', this.emptyIssueReplyNumWeekly);
    // scheduleJob('0 0 0 * * 1', this.emptyArticleUpNumWeekly);
    // scheduleJob('0 0 0 1 * *', this.emptyArticleUpNumMonthly);
  }
}
