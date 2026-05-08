import React from "react";
import style from "./registerPersonalInfoForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { UIInputField, RadioBtnGroup } from "@/shared/ui";
import { Colors, RtkQueryResultError } from "@/shared/types";
import { UserPersonalInfoFormData } from "../../types/form";
import SubmitBtn from "../SubmitBtn";
import { Box } from "@mui/material";
import { validateAdult } from "../../../lib/validation/validateAdult";
import { Sex } from "@/entities/user";
import HydratedForm from "../HydratedRegisterProcessForm";

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {

  return (
    <HydratedForm className={style.personalInfoForm} onSubmit={onSubmit}>
      <Box className={style.fields}>
        <Box className={style.textField}>
          <Box sx={{ gridArea: "fn", width: 383 }}>
            <UIInputField
              control={control}
              name="firstName"
              inputParams={{ isRequired: true, label: "First name" }}
              rootError={result.rootError}
            />
          </Box>
        </Box>

        <Box sx={{ gridArea: "ln" }}>
          <UIInputField
            control={control}
            name="lastName"
            inputParams={{
              isRequired: true,
              label: "Last name",
            }}
            rootError={result.rootError}
          />
        </Box>

        <Box sx={{ gridArea: "bd" }}>
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
        </Box>

        <Box sx={{ height: 102, gridArea: "sx", position: "relative", top: "10px" }}>
          <RadioBtnGroup
            control={control}
            name="sex"
            items={[
              { value: Sex.Male, text: Sex.Male, bgColor: Colors.InfoLight },
              {
                value: Sex.Female,
                text: Sex.Female,
                bgColor: Colors.PrimaryMain,
              },
              {
                value: Sex.Custom,
                text: Sex.Custom,
              },
            ]}
          />
        </Box>

         <Box sx={{ gridArea: "gi", height: "100%", width: "100%", margin: "auto"}}>
          <UIInputField
            control={control}
            name="genderInfo"
            inputParams={{
              label: "Gender information (optional)",
              type: "multilineText"
            }}
            rootError={result.rootError}
          />
        </Box>

        {result.rootError && (
          <Box
            color="error"
            className={style.rootError}
            sx={{ color: "error.main" }}
          >
            {result.rootError || "Failed to send data"}
          </Box>
        )}
        <Box sx={{ gridArea: "sb", margin: "auto", marginTop: "42px", width: 383 }}>
          <SubmitBtn />
        </Box>
      </Box>
    </HydratedForm>
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
