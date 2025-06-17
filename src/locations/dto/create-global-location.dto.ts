import { ApiProperty } from '@nestjs/swagger';

export class CreateGlobalLocationDto {
  @ApiProperty()
  country!: string;

  @ApiProperty()
  state!: string;

  @ApiProperty()
  city!: string;
}
