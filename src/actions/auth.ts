import { createAction } from 'typesafe-actions';

export const login = createAction('auth/LOGIN', resolve => {
    return (username: string, password: string) => resolve({ username, password });
});

export const logout = createAction('auth/LOGOUT', resolve => {
    return () => resolve()
});