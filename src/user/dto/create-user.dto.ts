export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    players: Array<string>;
    games: Array<string>;
}
