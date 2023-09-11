type UserDto = {
    id: string;
    slug: string;
    type: string;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
};

type UserSchemaDto = UserDto & Document;
type UserUpdateDto = Partial<Omit<UserDto, "password">>;

export { UserDto, UserSchemaDto, UserUpdateDto };