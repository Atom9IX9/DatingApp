import React from "react";
import style from "./credentialsForm.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import { Control } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { DataForLogin, validateEmail } from "@/features/auth";
import { UIIconInputField } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { CredentialsData } from "../../types/form";
import SubmitBtn from "./SubmitBtn";

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <form className={style.credentialsForm} onSubmit={onSubmit}>
      <div className={style.fields}>
        <UIIconInputField
          control={control}
          name="email"
          inputParams={{ isRequired: true, label: "Email" }}
          icon={<PersonIcon sx={{ width: 30, height: 30 }} />}
          validate={{ validateEmail }}
          rootError={result.rootError}
        />
        <UIIconInputField
          control={control}
          name="password"
          inputParams={{
            isRequired: true,
            label: "Password",
            type: "password",
          }}
          icon={<LockIcon sx={{ width: 30, height: 30 }} />}
          rootError={result.rootError}
        />
        <UIIconInputField
          control={control}
          name="confirmPassword"
          inputParams={{
            isRequired: true,
            label: "Confirm password",
            type: "password",
          }}
          icon={<LockIcon sx={{ width: 30, height: 30 }} />}
          rootError={result.rootError}
        />
        {!!result.error && (
          <div className={style.rootError}>
            {(result.error as RtkQueryResultError).data?.message ||
              "Failed to send data"}
          </div>
        )}
        <SubmitBtn />
      </div>
    </form>
  );
};

export default CredentialsForm;
type CredentialsFormProps = {
  onSubmit: () => void;
  control: Control<CredentialsData>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
