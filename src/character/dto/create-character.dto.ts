export class CreateCharacterDto {
    name: string;
    properties: {
        experience: string;
        sanity: string;
        strength: string;
        intelligence: string;
        willingness: string;
        ability: string;
        violence: string;
    };
}

