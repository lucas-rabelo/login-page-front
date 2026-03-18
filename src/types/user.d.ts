export type CreateUserDto = {
    name: string;
    email: string;
    role: string | null;
    password: string;
    birthDate: string;
}

export type UpdateUserDto = Partial<CreateUserDto> & {
    uuid: string;
};

export type ReadUserDto = Partial<CreateUserDto> & {
    uuid: string;
    createdAt: string;
    updatedAt: string;
}