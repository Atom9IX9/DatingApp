import { HttpError } from "../errors";

export async function executeServerAction<D>(
  mutation: Mutation<D>,
): ActionResponse<D> {
  try {
    return {
      success: true,
      data: await mutation(),
    };
  } catch (err) {
    let message = "Unexpected error";
    if (err instanceof HttpError) {
      message = err.message;
    }

    return {
      success: false,
      errorMessage: message,
    };
  }
}

type Mutation<D> = () => Promise<D | undefined>;
type ActionResponse<D> = Promise<{
  success: boolean;
  errorMessage?: string;
  data?: D;
}>;
