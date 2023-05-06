import { Logger, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, ILike, Repository } from "typeorm";
import { PostEntity } from "./entities/post.entity";
import * as crypto from "crypto";
import { z } from "zod";

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});
const PostArraySchema = z.array(PostSchema);
type Post = z.infer<typeof PostSchema>;

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(PostEntity)
    private repo: Repository<PostEntity>,
    private readonly httpService: HttpService,
    private dataSource: DataSource
  ) {}

  // TODO pls handel error properly
  async create(createPostDto: CreatePostDto) {
    const createFn = async () => {
      const newPost = await this.repo.create(createPostDto);
      await this.repo.save(newPost);
    };

    return this._transactionHelper(createFn);
  }

  async findTop3() {
    this.logger.debug("findTop3");
    const selectCol = ["p.userId", "p.postId", "p.title", "p.body"];
    return await this.repo
      .createQueryBuilder("p")
      .select(selectCol)
      .limit(3)
      .getMany();
  }

  async searchInBody(searchTerm: string) {
    this.logger.debug("searchInBody", searchTerm);
    const results = await this.repo.find({
      where: { body: ILike(`%${searchTerm}%`) },
    });
    return results;
  }

  async findOne(getCriteria: { userId: string; postId: string }) {
    this.logger.debug("findOne", JSON.stringify(getCriteria));
    return await this.repo.find({
      where: {
        userId: getCriteria.userId,
        postId: getCriteria.postId,
      },
    });
  }

  async update(updatePostDto: UpdatePostDto) {
    this.logger.debug("update", JSON.stringify(updatePostDto));
    const updateFn = async () => {
      await this.repo.update(
        {
          userId: updatePostDto.userId,
          postId: updatePostDto.postId,
        },
        {
          title: updatePostDto.title,
          body: updatePostDto.body,
        }
      );
    };

    return this._transactionHelper(updateFn);
  }

  async remove(removeCriteria: { userId: string; postId: string }) {
    this.logger.debug("remove", JSON.stringify(removeCriteria));
    const updateResult = await this.repo.softDelete({
      userId: removeCriteria.userId,
      postId: removeCriteria.postId,
    });

    return {
      affectedRow: updateResult.affected,
      msg: `This action remove post of userId${removeCriteria.userId} and postId ${removeCriteria.postId}`,
    };
  }

  async getFromExternal() {
    this.logger.debug("getFromExternal");
    const { data: postList } = await firstValueFrom(
      this.httpService
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          // why add headers? https://github.com/axios/axios/issues/5346
          headers: { "Accept-Encoding": "gzip,deflate,compress" },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw "An error happened!";
          })
        )
    );
    PostArraySchema.parse(postList);

    const postEntities = postList.map((post) => {
      return this.repo.create({
        userId: crypto.randomUUID(),
        postId: crypto.randomUUID(),
        title: post.title,
        body: post.body,
      });
    });

    await this.repo.save(postEntities);
    return postList;
  }

  async _transactionHelper(fn: Function) {
    this.logger.debug("_transactionHelper");
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await fn();
    } catch (error) {
      console.log("error at Transaction", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      console.log("finished Transaction");
    }
  }
}
