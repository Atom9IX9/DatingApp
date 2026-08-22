import React from "react";
import { Control } from "react-hook-form";
import { Box } from "@mui/material";

import { BaseBtn, MultitextField, TagsField } from "@/shared/ui";

import HydratedForm from "../../../ui/HydratedForm";
import { validateEmptyArray } from "../../model/validation/validateEmptyArray";
import { RegisterUserDescriptionReqBody } from "../../api/registerUserDescriptionAction";

import style from "./descriptionForm.module.scss";

// Form component that captures description input.
const DescriptionForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  // Render the component's JSX structure.
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
          <BaseBtn type="submit" variant="contained" fullWidth>
            Continue
          </BaseBtn>
        </Box>
      </Box>
    </HydratedForm>
  );
};

// Form component that captures description input.
export default DescriptionForm;
// Props type for the CredentialsForm component.
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<RegisterUserDescriptionReqBody>;
  result: {
    rootError?: string;
  };
};
