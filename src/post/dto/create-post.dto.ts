import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    required: true,
    description: 'something random, like "xsdefgsdkf"',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    required: true,
    description: 'something random, like "xsdefgsdkf"',
  })
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    required: false,
    description: "string, like `this is title`",
  })
  title: string;

  @ApiProperty({
    required: false,
    description: "string, like `this is body`",
  })
  body: string;
}
