
import {
  CredentialsForm,
  DescriptionForm,
  RegisterUserPersonalInfoForm,
} from "@/features/auth";
import { useAppDispatch } from "@/shared/lib";
import { setCurrentStep } from "../model/registerProcess.slice";
import {
  registerUserPersonalInfo,
  setUserAuth,
  setUserDescription,
} from "@/entities/user";
import { AvatarUploadForm } from "@/features/avatarCustomization";
import { Box } from "@mui/material";
import { setAvatar } from "@/entities/avatar";
import { redirect } from "next/navigation";

const RegisterProcessForms: React.FC<Props> = ({ currentStep }) => {
  const dispatch = useAppDispatch();

  const nextStep = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  switch (currentStep) {
    case 1:
// Render the component's JSX structure.
      return (
        <CredentialsForm
          onSuccess={({ auth: { authId, email } }) => {
            dispatch(setUserAuth({ email, authId }));
            nextStep();
          }}
        />
      );
    case 2:
// Render the component's JSX structure.
      return (
        <RegisterUserPersonalInfoForm
          onSuccess={(data) => {
            dispatch(registerUserPersonalInfo(data));
            nextStep();
          }}
        />
      );
    case 3:
// Render the component's JSX structure.
      return (
        <DescriptionForm
          onSuccess={(data) => {
            dispatch(setUserDescription(data));
            nextStep();
          }}
        />
      );
    case 4:
// Render the component's JSX structure.
      return (
        <Box sx={{ mt: "31px" }}>
          <AvatarUploadForm onSuccess={(data) => {
            dispatch(setAvatar(data))
            redirect("/home")
          }} />
        </Box>
      );
  }
};

export default RegisterProcessForms;
// Type describing component props.
type Props = {
  currentStep: number;
};
