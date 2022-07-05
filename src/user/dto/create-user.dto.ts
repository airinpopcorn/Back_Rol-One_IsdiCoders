export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    characters: Array<string>;
    games: Array<string>;
}
