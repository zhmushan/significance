import { Context } from 'koa'
import { IUser, IFile } from '../models'
import { ResultVO, ResultCode, VideoVO } from '../vo'
import * as path from 'path'
import * as fs from 'fs'
import { isVideo } from '../utils'
import { VideoService } from '../services'

export class VideoController {
  static async createOne(ctx: Context) {
    const user: IUser = ctx.state.user
    const files: { [index: string]: IFile } = ctx.request.body.files

    try {
      const res = []
      for (const key in files) {
        const file = files[key]
        const name = path.basename(file.path)
        const ext = path.extname(file.name)
        if (!isVideo(ext)) {
          fs.unlink(file.path, () => {})
          res.push({
            key,
            code: ResultCode.EXTNAME_ERR,
          })
        } else {
          const video = await VideoService.createOne({ userId: user.id, name })
          res.push(new VideoVO(video))
        }
      }
      ctx.body = ResultVO.success(res)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }
}
