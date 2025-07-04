import React from "react";
import style from "./signInForm.module.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import SignInFieldController from "../Field/FieldController";
import { Control } from "react-hook-form";
import { DataForLogin } from "@/api/authAPI";
import { validateEmail } from "@/utils/validation/singInValidation";
import LockIcon from "@mui/icons-material/Lock";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { Box, Button, Checkbox, darken, FormControlLabel } from "@mui/material";
import { TApiError } from "@/types/types";
import { Colors } from "@/types/colors";

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <form className={style.signInForm} onSubmit={onSubmit}>
      <Box className={style.formIcon}>
        <PersonOutlineIcon sx={{ width: 50, height: 50, color: "#ffffff" }} />
      </Box>
      <Box className={style.fields}>
        <SignInFieldController
          control={control}
          name="email"
          inputParams={{ isRequired: true, label: "Email" }}
          icon={<PersonIcon sx={{ width: 30, height: 30 }} />}
          validate={{ validateEmail }}
          rootError={result.rootError}
        />
        <SignInFieldController
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
        <FormControlLabel
          className={style.rememberMeLabel}
          label="Remember me"
          control={
            <Checkbox
              color="secondary"
              sx={{ color: Colors.SecondaryLight }}
              {...control.register("rememberMe")}
            />
          }
        />
        {!!result.error && (
          <div className={style.rootError}>
            {(result.error as TApiError).data?.message || "Failed to send data"}
          </div>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={style.submitBtn}
        disabled={result.status === QueryStatus.pending}
      >
        submit
      </Button>
    </form>
  );
};

export default SignInForm;
type SignInFormProps = {
  onSubmit: () => void;
  control: Control<DataForLogin>;
  result: {
    error?: TApiError;
    status: QueryStatus;
    rootError?: string;
  };
};
