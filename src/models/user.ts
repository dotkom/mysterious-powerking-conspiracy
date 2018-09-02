type ID = number;
type Token = string;

export interface IUser {
    id?: ID;
    username?: string;
    name?: string;
    token?: Token;
}
