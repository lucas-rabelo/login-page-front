import { SpinnerGap } from "@phosphor-icons/react";
import { useState } from "react";

import GoogleIcon from "../../assets/google.svg";
import { API_GOOGLE_AUTH_URL } from "../../utils/constants";

import type { ButtonGoogleProps } from "./types";

export function ButtonGoogle({
  label = "Ou faça login com o Google",
}: ButtonGoogleProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSign() {
    try {
      window.location.href = API_GOOGLE_AUTH_URL;
    } catch (error) {
      console.log("Erro no login:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleSign}
      disabled={isLoading}
      className="flex flex-row items-center justify-center gap-2 rounded bg-slate-800 text-white py-4 px-8 w-full"
    >
      {isLoading && <SpinnerGap className="animate-spin" size={24} />}
      <img src={GoogleIcon} alt="Logo do google" /> {label}
    </button>
  );
}

