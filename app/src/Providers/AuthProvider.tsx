import { useLoginMutation } from "@/api/authAPI";
import { selectAuth } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import User from "@/models/user.model";
import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuth } from "@/lib/store/slices/authSlice/authSlice";

const AuthContext = createContext<User | undefined>(undefined);

const AuthProvider: React.FC<{ children: TChildren }> = ({ children }) => {
  const auth = useSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (!auth) {
      // ! TODO: checkAuth() method WITH GET SERVER SIDE PROPS!!
    }
  }, [dispatch, login, auth]);

  useEffect(() => {
    if (result.data) {
      dispatch(setAuth(result.data));
    }
  }, [dispatch, result.data]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
