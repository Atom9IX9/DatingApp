import {
  CredentialsForm,
  DescriptionForm,
  RegisterUserPersonalInfoForm,
} from "@/features/auth";
import { useAppDispatch } from "@/shared/lib";
import { setCurrentStep } from "../model/registerProcess.slice";
import {
  registerUserPersonalInfo,
  setUserAccountInfo,
  setUserAuth,
  setUserDescription,
} from "@/entities/user";
import UploadForm from "@/features/avatarUppload/ui/UploadForm";
import { Box } from "@mui/material";

const RegisterProcessForms: React.FC<Props> = ({ currentStep }) => {
  const dispatch = useAppDispatch();

  const nextStep = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  switch (currentStep) {
    case 1:
      return (
        <CredentialsForm
          onSuccess={({ auth: { authId, email } }) => {
            dispatch(setUserAuth({ email, authId }));
            nextStep();
          }}
        />
      );
    case 2:
      return (
        <RegisterUserPersonalInfoForm
          onSuccess={(data) => {
            dispatch(registerUserPersonalInfo(data));
            nextStep();
          }}
        />
      );
    case 3:
      return (
        <DescriptionForm
          onSuccess={(data) => {
            dispatch(setUserDescription(data));
            nextStep();
          }}
        />
      );
    case 4:
      return <Box sx={{ mt: "31px" }}><UploadForm /></Box>;
  }
};

export default RegisterProcessForms;
type Props = {
  currentStep: number;
};
