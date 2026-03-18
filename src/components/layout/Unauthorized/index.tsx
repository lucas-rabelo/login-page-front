export function Unauthorized() {
    return(
        <div className="flex items-center justify-center w-full h-screen bg-white shadow-2xl rounded">
            <h1 className="py-2 px-8 border-[1px] border-slate-400 rounded">
                Você não tem permissão para acessar essa página
            </h1>
        </div>
    );
}

