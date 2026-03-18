import { useNavigate } from "react-router-dom";

import { signOut } from "../../../services/auth.service"

export function Header() {
    const navigate = useNavigate();
    
    function handleSignOut() {
        signOut();
        navigate("/")
    }

    return(
        <header className="w-full bg-white p-5 flex items-center justify-between">
            <h1 className="text-lg text-green-700 font-bold">
                Login App
            </h1>

            <button onClick={handleSignOut} className="py-2 px-4 rounded bg-red-600 text-white ">
                Sair
            </button>
        </header>
    )
}

