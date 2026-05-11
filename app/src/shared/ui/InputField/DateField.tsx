import { TControllerField } from "@/shared/types";
import { FieldProps } from "../../types/fields";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FieldValues } from "react-hook-form";

function DateField<FV extends FieldValues>({ field, error, inputParams }: FieldProps<FV>)  {
  return (
    <DatePicker
      value={field.value || null}
      onChange={(value: Dayjs | null) => field.onChange(value)}
      disableFuture
      maxDate={dayjs().subtract(18, "year")}
      slotProps={{
        textField: {
          id: field.name,
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
  );
};

export default DateField;

