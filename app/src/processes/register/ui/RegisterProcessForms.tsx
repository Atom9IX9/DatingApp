import { CredentialsForm, RegisterUserPersonalInfoForm } from "@/features/auth";
import { useAppDispatch } from "@/shared/lib";
import { setCurrentStep } from "../model/registerProcess.slice";
import { registerUserPersonalInfo, setUserAccountInfo, setUserAuth } from "@/entities/user";

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
            dispatch(
              registerUserPersonalInfo(data),
            );
            nextStep();
          }}
        />
      );
    case 3:
      return <div>Form for Step 3</div>;
    case 4:
      return <div>Form for Step 4</div>;
  }
};

export default RegisterProcessForms;
type Props = {
  currentStep: number;
};
