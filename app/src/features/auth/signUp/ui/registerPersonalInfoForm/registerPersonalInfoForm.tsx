import React, { useEffect, useState } from "react";
import style from "./registerPersonalInfoForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { UIInputField, BackdropLoader } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { UserPersonalInfoFormData } from "../../types/form";
import SubmitBtn from "../SubmitBtn";
import { Box } from "@mui/material";
import { validateAdult } from "../../../lib/validation/validateAdult";

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Box component="form" className={style.credentialsForm} onSubmit={onSubmit}>
      <BackdropLoader isOpen={!isHydrated} renderBeforeHydration={true} />
      <Box className={style.fields}>
        <UIInputField
          control={control}
          name="firstName"
          inputParams={{ isRequired: true, label: "First name" }}
          rootError={result.rootError}
        />
        <UIInputField
          control={control}
          name="lastName"
          inputParams={{
            isRequired: true,
            label: "Last name",
          }}
          rootError={result.rootError}
        />
        <UIInputField
          control={control}
          name="dateOfBD"
          inputParams={{
            isRequired: true,
            label: "Date of birth",
            type: "date",
          }}
          validate={{ validateAdult }}
          rootError={result.rootError}
        />
        {result.rootError && (
          <Box
            color="error"
            className={style.rootError}
            sx={{ color: "error.main" }}
          >
            {result.rootError || "Failed to send data"}
          </Box>
        )}
        <SubmitBtn />
      </Box>
    </Box>
  );
};

export default CredentialsForm;
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<UserPersonalInfoFormData>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
