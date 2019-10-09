export class User {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    sexo: number;
    nascimento: Date;
    id: number;
    data: User;
}
export class ResponseUsers {
    data: User[];
}



// Modelos para criação
export class RequestCreate {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    sexo: string;
    nascimento: Date;
}
export class ResponseCreate {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    sexo: string;
    nascimento: Date;
    id: string;
}

// Modelos para o GetUser
export class ResponseUser {
    data: User
}

// Modelos para editar
export class RequestUpdate {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    sexo: string;
    nascimento: Date;
}
export class ResponseUpdate {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    sexo: string;
    nascimento: Date;
}