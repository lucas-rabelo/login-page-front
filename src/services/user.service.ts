import type { CreateUserDto, ReadUserDto, UpdateUserDto } from '../types/user';
import { api } from './api';


export async function listUser(token: string | null) {
    try {
        api.defaults.headers.authorization = `Bearer ${token}`;
        const { data } = await api.get<ReadUserDto[]>("/users");
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUser(uuid: string) {
    try {
        const { data } = await api.delete(`/users/${uuid}`);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function createUser(createUserDto: CreateUserDto) {
    try {
        const { data } = await api.post(`/users`, createUserDto);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateUser(updateUserDto: UpdateUserDto) {
    try {
        const { data } = await api.put(`/users`, updateUserDto);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function editUser(uuid: string) {
    try {
        const { data } = await api.get<ReadUserDto>(`/users/${uuid}`);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}