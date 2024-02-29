import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authServices from "../utils/AuthServices";
import { userLoggedIn } from "../store/authSlice";

const useAuthUser = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetail = async () => {
      setisLoading(true);
      try {
        const userResponse = await authServices.getUser();
        dispatch(userLoggedIn(userResponse));
      } catch (error) {
        dispatch(userLoggedIn(null));
      } finally {
        setisLoading(false);
      }
    };

    userDetail();
  }, [dispatch]);

  return [isLoading];
};


export default useAuthUser;

