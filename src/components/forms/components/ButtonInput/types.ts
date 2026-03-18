import type { Dispatch, SetStateAction } from "react";

export type ButtonInputProps = {
  actionValue: boolean;
  setAction: Dispatch<SetStateAction<boolean>>;
};

