import { Box, InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import classNames from "classnames";
import ErrorIcon from "@mui/icons-material/Error";
import style from "./field.module.scss";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

function Field<FV extends FieldValues>({
  inputParams,
  error,
  field,
}: InputProps<FV>) {
  return (
    <Box
      className={classNames(style.fieldLabel, {
        [style.error]: error.field || error.root,
      })}
    >
      <InputLabel
        shrink
        sx={{
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "var(--font-primary)",
          "&.Mui-focused": {
            color: "primary.main",
          },
        }}
        htmlFor={field.name}
      >
        {inputParams?.label}
      </InputLabel>

      {inputParams?.type !== "date" ? (
        <TextField
          id={field.name}
          fullWidth={true}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 0,
              input: {
                padding: "0px 42px 0px 16px",
                height: 52,
              },
            },
          }}
          variant="filled"
          {...field}
          required={inputParams?.isRequired}
          type={inputParams?.type || "text"}
          autoComplete={inputParams?.autocomplete ? "on" : "new-password"}
          error={!!(error.field || error.root)}
        />
      ) : (
        <DatePicker
          value={field.value || null}
          onChange={(value: Dayjs | null) => field.onChange(value)}
          disableFuture
          maxDate={dayjs().subtract(18, "year")}
          slotProps={{
            textField: {
              variant: "filled",
              fullWidth: true,
              error: !!(error.field || error.root),
              required: inputParams?.isRequired,
              sx: {
                "& .mui-18og7n6-MuiPickersInputBase-root-MuiPickersFilledInput-root":
                  {
                    borderRadius: 0,
                  },
                "& .mui-1p0wv2k-MuiPickersSectionList-root-MuiPickersInputBase-sectionsContainer-MuiPickersFilledInput-sectionsContainer, .mui-1pic7fm-MuiPickersSectionList-root-MuiPickersInputBase-sectionsContainer-MuiPickersFilledInput-sectionsContainer":
                  {
                    paddingTop: "16px",
                    paddingBottom: "16px",
                  },
                "& .MuiInputBase-root": {
                  borderRadius: 0,
                  input: {
                    padding: "0px 42px 0px 16px",
                    height: 52,
                  },
                },
              },
            },
          }}
        />
      )}

      {(error.field || error.root) && !(inputParams?.type === "date") && (
        <Box className={style.errorIcon}>
          <ErrorIcon />
        </Box>
      )}
      <div className={style.fieldError}>{error.field}</div>
    </Box>
  );
}

export default Field;
type InputProps<FV extends FieldValues> = {
  inputParams?: InputParams;
  error: {
    field?: string;
    root?: string;
  };
  field: ControllerRenderProps<FV, Path<FV>>;
};
export type InputParams = {
  label?: string;
  isRequired?: boolean;
  type?: "text" | "password" | "date";
  autofocus?: boolean;
  autocomplete?: boolean;
};
