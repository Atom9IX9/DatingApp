"use client";

import { FieldValues } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Box, Button, Chip, TextField } from "@mui/material";

import { BasicFieldParams, FieldProps } from "../../../types/fields";
import FieldContainer from "../FieldContainer";

function TagsField<FV extends FieldValues>({
  error,
  field,
  fieldParams,
}: FieldProps<FV, TagsFieldParams>) {
  // React state storing inputValue values and updating them with InputValue.
  const [inputValue, setInputValue] = useState("");
  // Boolean helper that checks whether maxtagscountreached is true.
  const isMaxTagsCountReached = !!(
    fieldParams?.maxTagsCount && field.value.length >= fieldParams.maxTagsCount
  );

  const handleButtonClick = () => {
    addTag(inputValue);
  };

  const addTag = (value: string) => {
    if (value && !field.value.includes(value) && !isMaxTagsCountReached) {
      field.onChange([...field.value, value]);
      setInputValue("");
    }
  };

  const onDeleteTag = (tag: string) => () => {
    const newTags = field.value.filter((t: string) => t !== tag);
    field.onChange(newTags);
  };

  const tags = field.value.map((tag: string) => (
    <Chip
      sx={{ height: 25, marginRight: "5px", marginBottom: "5px" }}
      label={tag}
      color="primary"
      onDelete={onDeleteTag(tag)}
      key={tag}
    />
  ));

  // Render the component's JSX structure.
  return (
    <FieldContainer<FV, TagsFieldParams>
      error={error}
      field={field}
      fieldParams={fieldParams}
      hideErrorIcon
    >
      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: -25,
            right: 0,
            color: "secondary.main",
            fontSize: 13,
          }}
        >{`${field.value.length}/${fieldParams?.maxTagsCount}`}</Box>
        <TextField
          disabled={isMaxTagsCountReached}
          id={field.name}
          fullWidth={true}
          helperText={
            fieldParams?.maxTagLength
              ? `${inputValue.length}/${fieldParams?.maxTagLength}`
              : ""
          }
          sx={{
            padding: 0,
            "& .MuiFormHelperText-root": {
              position: "absolute",
              right: 23,
              top: 3,
            },
            "& .MuiInputBase-root": {
              borderRadius: 0,
              padding: 0,
              input: {
                padding: "0px 42px 0px 16px",
                height: 30,
                width: "80%",
              },
            },
          }}
          variant="filled"
          {...field}
          required={fieldParams?.isRequired}
          autoComplete={fieldParams?.autocomplete ? "on" : "new-password"}
          error={!!(error.field || error.root)}
          inputProps={{ maxLength: fieldParams?.maxTagLength }}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button
          disabled={isMaxTagsCountReached}
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleButtonClick}
          sx={{
            position: "absolute",
            right: 0,
            height: "100%",
            width: "25px",
            boxShadow: "none",
            minWidth: 0,
            borderRadius: 0,
          }}
        >
          <AddIcon />
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "#00ffc826",
          height: 120,
          marginTop: "10px",
          marginBottom: "5px",
          border: "1px dashed",
          borderColor: "secondary.main",
          padding: "10px 5px 5px 5px",
        }}
      >
        {tags}
      </Box>
    </FieldContainer>
  );
}

export default TagsField;
// Exported type alias used for typing shared data shapes.
export type TagsFieldParams = BasicFieldParams<{
  maxTagLength?: number;
  maxTagsCount?: number;
}>;
