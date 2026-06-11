
import React from "react";
import style from "./registerPersonalInfoForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import {
  BaseBtn,
  DateField,
  MultitextField,
  RadioBtnGroup,
  TextField,
} from "@/shared/ui";
import { Colors, RtkQueryResultError } from "@/shared/types";
import { UserPersonalInfoFormData } from "../../types/form";
import { Box } from "@mui/material";
import { validateAdult } from "../../../model/validation/validateAdult";
import { Sex } from "@/entities/user";
import HydratedForm from "../../../ui/HydratedForm";

// Form component that captures credentials input.
const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
// Render the component's JSX structure.
  return (
    <HydratedForm className={style.personalInfoForm} onSubmit={onSubmit}>
      <Box className={style.fields}>
        <Box className={style.textField}>
          <Box sx={{ gridArea: "fn", width: 383 }}>
            <TextField
              control={control}
              name="firstName"
              fieldParams={{
                isRequired: true,
                label: "First name",
                type: "text",
              }}
              rootError={result.rootError}
            />
          </Box>
        </Box>

        <Box sx={{ gridArea: "ln" }}>
          <TextField
            control={control}
            name="lastName"
            fieldParams={{
              isRequired: true,
              label: "Last name",
              type: "text",
            }}
            rootError={result.rootError}
          />
        </Box>

        <Box sx={{ gridArea: "bd" }}>
          <DateField
            control={control}
            name="dateOfBD"
            fieldParams={{
              isRequired: true,
              label: "Date of birth",
              minYearsAgo: 18,
            }}
            validate={{ validateAdult }}
            rootError={result.rootError}
          />
        </Box>

        <Box
          sx={{
            height: 102,
            gridArea: "sx",
            position: "relative",
            top: "10px",
          }}
        >
          <RadioBtnGroup
            control={control}
            name="sex"
            items={[
              { value: Sex.Male, text: Sex.Male, bgColor: "info.main" },
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

        <Box
          sx={{ gridArea: "gi", height: "100%", width: "100%", margin: "auto" }}
        >
          <MultitextField
            control={control}
            name="genderInfo"
            fieldParams={{
              label: "Gender information (optional)",
              rows: 5,
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
        <Box
          sx={{ gridArea: "sb", margin: "auto", marginTop: "42px", width: 383 }}
        >
          <BaseBtn type="submit" variant="contained" fullWidth>
            Continue
          </BaseBtn>
        </Box>
      </Box>
    </HydratedForm>
  );
};

// Form component that captures credentials input.
export default CredentialsForm;
// Props type for the CredentialsForm component.
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<UserPersonalInfoFormData>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
