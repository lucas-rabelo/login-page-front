import type { CreateUserDto } from '../types/user';
import { api } from './api';

export async function signIn(email: string, password: string) {
    const { data } = await api.post("/v1/auth/login", {
        email,
        password
    });
    return data;
}
export async function signInWithGoogle() {
    const { data } = await api.get("/v1/auth/google");
    return data;
}

export function signOut() {
    window.localStorage.removeItem('token');
}

export async function register(createUserDto: CreateUserDto) {
    const { data } = await api.post("/v1/auth/register", createUserDto);
    return data;
}

export async function registerWithGoogle() {
    const { data } = await api.get("/v1/auth/google");
    return data;
}