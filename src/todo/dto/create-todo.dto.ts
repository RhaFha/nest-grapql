import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    descripcion?: string;


}
