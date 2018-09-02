import { User } from '../models/user';

export const login = (username: string, password: string): User => {
    return {
        id: 0,
        username: 'testuser',
        name: 'Test User',
        token: 'okidoki'
    } as User;
}