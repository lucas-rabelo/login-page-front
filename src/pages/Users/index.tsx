import { useEffect, useState } from "react";

import { Header } from "../../components/layout/Header";
import { Content } from "../../components/layout/Content";
import { Footer } from "../../components/layout/Footer";
import { UserList } from "../../components/tables/UserList";

import { deleteUser, listUser } from "../../services/user.service";
import { Drawer } from "../../components/Drawer";
import { UserForm } from "../../components/forms/UserForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../services/query-client";
import { Unauthorized } from "../../components/layout/Unauthorized";

export function Users() {
    const token = window.localStorage.getItem("token");

    const [drawerState, setDrawerState] = useState<boolean>(false);
    const [userSelected, setUserSelect] = useState<string>("");

    const { data: users, status } = useQuery({ 
        queryKey: ['users'], 
        queryFn: async () => await listUser(token),
        enabled: !!token 
    });

    const { mutate: deleteUserMutateFn } = useMutation({
        mutationFn: async (uuid: string) => await deleteUser(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    })

    async function deleteUserByUuid(uuid: string) {
        deleteUserMutateFn(uuid)
    }

    async function editUserByUuid(uuid: string) {
        setUserSelect(oldState => oldState === uuid ? "": uuid);
    }
    
    function handleCloseDrawer() {
        if(userSelected !== "") {
            setUserSelect("");
        } else {
            setDrawerState(false);
        }
    }

    useEffect(() => {
        if(userSelected !== "") {
            setDrawerState(true);
        } else {
            setDrawerState(false);
        }
    }, [userSelected]);

    return(
        <div className="flex flex-1 flex-col w-full h-auto bg-green-100">
            <Header />
            {status === 'success' ? 
                <Content>
                    {users && <UserList 
                        data={users} 
                        onDelete={deleteUserByUuid}
                        onEdit={editUserByUuid}
                        onCreateNew={() => setDrawerState(true)}
                    />}
                </Content>
                :
                <Content>
                    <Unauthorized />
                </Content>
            }
            <Footer />

            <Drawer 
                title={userSelected ? "Atualizar usuário" : "Cadastrar usuário"}
                isOpen={drawerState}
                onClose={handleCloseDrawer}
            >
                <UserForm
                    userUuid={userSelected}
                    onCancel={handleCloseDrawer}
                />
            </Drawer>
        </div>
    )
}

