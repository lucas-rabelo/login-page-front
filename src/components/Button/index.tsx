import { SpinnerGap } from "@phosphor-icons/react";
import GoogleIcon from "../../assets/google.svg";
import { button } from "./styles";
import type { ButtonProps } from "./types";

export function Button({
  variant = "primary",
  padding = 'medium',
  label,
  disabled = false,
  textColor = 'white',
  size = 'full',
  isGoogleButton = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={button({ variant, padding, disabled, textColor, size })}
      {...rest}
    >
      {disabled ? <SpinnerGap className="animate-spin" size={24} /> : null}
      {isGoogleButton ? <img src={GoogleIcon} alt="Logo do google" /> : null}
      {label}
    </button>
  );
}
