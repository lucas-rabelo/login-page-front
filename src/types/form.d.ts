import { Dispatch, SetStateAction, useState } from "react";
import type { TYPE_FORM } from "../utils/constants";

export type FormProps = {
    setChangeTypeForm: Dispatch<
      SetStateAction<(typeof TYPE_FORM)[keyof typeof TYPE_FORM]>
    >;
}

export type FormTypeProps = (typeof TYPE_FORM)[keyof typeof TYPE_FORM];