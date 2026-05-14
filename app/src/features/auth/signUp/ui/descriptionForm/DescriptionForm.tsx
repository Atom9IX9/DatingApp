import React from "react";
import style from "./descriptionForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { validateEmail } from "../../..";
import { MultitextField, TagsField } from "@/shared/ui";
import { RtkQueryResultError, TValidationFunction } from "@/shared/types";
import SubmitBtn from "../SubmitBtn";
import { Box } from "@mui/material";
import HydratedForm from "../HydratedRegisterProcessForm";
import { RegisterUserDescriptionReqBody } from "../../api/signUpAPI";
import { validateEmptyArray } from "../../model/validation/validateEmptyArray";

const DescriptionForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <HydratedForm className={style.descriptionForm} onSubmit={onSubmit}>
      <Box className={style.fields}>
        <TagsField
          control={control}
          name="hobbies"
          fieldParams={{
            label: "Hobbies and interests",
            maxTagLength: 20,
            maxTagsCount: 7,
            autocomplete: false,
          }}
          rootError={result.rootError}
          validate={{ validateEmptyArray }}
        />
        <MultitextField
          control={control}
          name="description"
          fieldParams={{
            label: "Short description",
            rows: 7,
            maxLength: 300,
            isRequired: true,
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
        <Box className={style.submitBtn}>
          <SubmitBtn />
        </Box>
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
