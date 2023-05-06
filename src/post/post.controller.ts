import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiTags } from "@nestjs/swagger";
import { RemovePostDto } from "./dto/remove-post.dto";

@ApiTags("post")
@Controller({
  path: "post",
  version: "1",
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("create")
  createController(@Body() createPostDto: CreatePostDto) {
    console.log("-> CreatePostDto", CreatePostDto);
    return this.postService.create(createPostDto);
  }

  @Get("external")
  getFromExternalController() {
    return this.postService.getFromExternal();
  }

  @Get("top3")
  findTop3Controller() {
    return this.postService.findTop3();
  }

  @Get("findOne")
  findOneController(@Query() params: { userId: string; postId: string }) {
    return this.postService.findOne({
      userId: params.userId,
      postId: params.postId,
    });
  }

  @Patch("update")
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto);
  }

  @Delete()
  remove(@Body() removePostDto: RemovePostDto) {
    return this.postService.remove({
      userId: removePostDto.userId,
      postId: removePostDto.postId,
    });
  }

  @Get("searchInBody")
  searchInBodyController(@Query() params: { searchTerm: string }) {
    return this.postService.searchInBody(params.searchTerm);
  }
}
