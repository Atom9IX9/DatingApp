import { CredentialsForm } from "@/features/auth";

const RegisterProcessForms: React.FC<Props> = ({ currentStep }) => {
  switch (currentStep) {
    case 1:
      return <CredentialsForm />;
    case 2:
      return <div>Form for Step 2</div>;
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
