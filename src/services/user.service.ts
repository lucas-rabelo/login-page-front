import type { CreateUserDto, ListUserDto, ReadUserDto, UpdateUserDto } from '../types/user';
import { api } from './api';


export async function listUser(token: string | null) {
    try {
        api.defaults.headers.authorization = `Bearer ${token}`;
        const { data } = await api.get<ListUserDto>("v1/users");
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUser(uuid: string) {
    try {
        const { data } = await api.delete(`v1/users/${uuid}`);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function createUser(createUserDto: CreateUserDto) {
    try {
        const { data } = await api.post(`v1/users`, createUserDto);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateUser(updateUserDto: UpdateUserDto) {
    try {
        const { data } = await api.put(`v1/users`, updateUserDto);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function editUser(uuid: string) {
    try {
        const { data } = await api.get<ReadUserDto>(`v1/users/${uuid}`);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}