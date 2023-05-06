import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RemovePostDto {
  @ApiProperty({
    required: true,
    description: "uuid",
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    required: true,
    description: "uuid",
  })
  @IsNotEmpty()
  postId: string;
}
