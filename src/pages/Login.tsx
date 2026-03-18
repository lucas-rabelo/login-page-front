import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";

import { Hero } from "../components/layout/Hero";

import { LoginForm } from "../components/forms/LoginForm";
import { RegisterForm } from "../components/forms/RegisterForm";
import { ForgetForm } from "../components/forms/ForgetForm";
import { ResetForm } from "../components/forms/ResetForm";
import { TYPE_FORM } from "../utils/constants";
import type { FormTypeProps } from "../types/form";

type Params = {
    token?: string;
}

export function Login() {
    const params = useParams<Params>();
    const token = params.token;

    const [formTypeShow, setFormTypeShow] = useState<FormTypeProps>(TYPE_FORM.LOGIN);

    useEffect(() => {
        if(token) {
            setFormTypeShow(TYPE_FORM.RESET);
        }
    }, [token]);

    const Form: Record<FormTypeProps, ReactNode> = {
        [TYPE_FORM.LOGIN]: <LoginForm setChangeTypeForm={setFormTypeShow} />,
        [TYPE_FORM.REGISTER]: <RegisterForm setChangeTypeForm={setFormTypeShow} />,
        [TYPE_FORM.FORGET]: <ForgetForm setChangeTypeForm={setFormTypeShow} />,
        [TYPE_FORM.RESET]: <ResetForm token={token} setChangeTypeForm={setFormTypeShow} />
    };

    return(
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center h-screen w-full">
            <Hero />
            {Form[formTypeShow]}
        </main>
    );
}