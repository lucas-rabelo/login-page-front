import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Content } from "../../components/layout/Content";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { UserList } from "../../components/tables/UserList";

import { UserForm } from "../../components/forms/UserForm";
import { Unauthorized } from "../../components/layout/Unauthorized";
import { Drawer } from "../../components/ui/Drawer";
import { useDrawer } from "../../components/ui/Drawer/hooks/useDrawer";
import { queryClient } from "../../services/query-client";
import { deleteUser, listUser } from "../../services/user.service";

export function Users() {
    const token = window.localStorage.getItem("token");

    const { drawerState, handleCloseDrawer, handleOpenDrawer } = useDrawer();

    const [userSelected, setUserSelect] = useState<string>("");

    const { data: userResponse, status } = useQuery({ 
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
    
    useEffect(() => {
        if(userSelected !== "") {
            handleOpenDrawer();
        } else {
            handleCloseDrawer();
        }
    }, [userSelected]);

    console.log(userResponse);

    return(
        <div className="flex flex-1 flex-col w-full h-auto bg-green-100">
            <Header />
            {status === 'success' ? 
                <Content>
                    {userResponse && userResponse.data.length ? (
                        <UserList 
                            data={userResponse.data} 
                            onDelete={deleteUserByUuid}
                            onEdit={editUserByUuid}
                            onCreateNew={() => handleOpenDrawer()}
                        />
                    ) : null}
                </Content>
                :
                <Content>
                    <Unauthorized />
                </Content>
            }
            <Footer />

            <Drawer
                isOpen={drawerState}
                title={userSelected ? "Atualizar usuário" : "Cadastrar usuário"}
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

