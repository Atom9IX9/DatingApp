import React from "react";
import style from "./descriptionForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { validateEmail } from "../../..";
import { TextField, StyledLink, MultitextField } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { CredentialsData } from "../../types/form";
import SubmitBtn from "../SubmitBtn";
import { Box } from "@mui/material";
import HydratedForm from "../HydratedRegisterProcessForm";
import { RegisterUserDescriptionReqBody } from "../../api/signUpAPI";

const DescriptionForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <HydratedForm className={style.descriptionForm} onSubmit={onSubmit}>
      <Box className={style.fields}>
        <TextField
        control={control}
        name="hobbies"
        fieldParams={{
          label: "Hobbies and interests",
          maxLength: 20,
          isRequired: true
        }}
        rootError={result.rootError}

          // control={control}
          // name="hobbies"
          // inputParams={{
          //   label: "Hobbies and interests",
          //   type: "text",
          //   maxLength: 20,
          //   rows: 0.2
          // }}
          // rootError={result.rootError}
        />
        <MultitextField
          control={control}
          name="description"
          fieldParams={{
            label: "Short description",
            rows: 7,
            maxLength: 300,
          }}
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
        {/* <SubmitBtn /> */}
      </Box>
    </HydratedForm>
  );
};

export default DescriptionForm;
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<RegisterUserDescriptionReqBody>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
