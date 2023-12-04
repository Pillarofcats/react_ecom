import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/default";
import { setUserInfoOnLoad } from "../redux/slices/userSlice";

export default function useAuthUser() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserInfoOnLoad());
  }, []);
}
