import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly label: string;

  @IsBoolean()
  readonly complete: boolean;
}
