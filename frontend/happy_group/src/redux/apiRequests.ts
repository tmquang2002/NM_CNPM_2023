import axios, { AxiosInstance } from "axios";
import UserAPI from "@/app/api/userAPI";
import {useRouter} from "next/router"
export const baseURL_user = "https://5dlr4.wiremockapi.cloud";
import navigate from "next/navigation"
export const apiV1_user = `${baseURL_user}`;
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
import { Dispatch, AnyAction } from "redux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { NavigateFunction } from "react-router";
//npm install axios

export const loginUser = async (user: any, dispatch: (arg0: { payload: any; type: "auth/loginStart" | "auth/loginSuccess" | "auth/loginFailed"; }) => void,router: string[] | AppRouterInstance) => {
  dispatch(loginStart());
  try {
    // const res = await axios.post("https://5dlr4.wiremockapi.cloud/users/login", user);
    

    const res=await UserAPI.login(user);
    dispatch(loginSuccess(res.data));
    router.push("/")
    return 1
  } catch (err) {
    dispatch(loginFailed());
    console.log(err)
  }
};

export const registerUser = async (user: any, dispatch: (arg0: { payload: undefined; type: "auth/registerStart" | "auth/registerSuccess" | "auth/registerFailed"; }) => void, router: string[] |  AppRouterInstance) => {
  dispatch(registerStart());
  try {
   const res= await UserAPI.register(user)
    console.log (res)
    //await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    // router.push("/")
  } catch (err) {
    dispatch(registerFailed());
    console.log(err)
  }
};

export const getAllUsers = async (token: any, dispatch: (arg0: { payload: any; type: "user/getUsersStart" | "user/getUsersSuccess" | "user/getUsersFailed"; }) => void, axiosJWT: { get: (arg0: string, arg1: { headers: { token: string; }; }) => any; }) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user", {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
    console.log(err)
  }
};

export const deleteUser = async (token: any, dispatch: (arg0: { payload: any; type: "user/deleteUserStart" | "user/deleteUsersSuccess" | "user/deleteUserFailed"; }) => void, id: string, axiosJWT: { delete: (arg0: string, arg1: { headers: { token: string; }; }) => any; }) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err));
    console.log(err)
  }
};
// export const registerUser = async (user: any, dispatch: (arg0: { payload: undefined; type: "auth/registerStart" | "auth/registerSuccess" | "auth/registerFailed"; }) => void, router: string[] |  AppRouterInstance) => {
// export const loginUser = async (user: any, dispatch: (arg0: { payload: any; type: "auth/loginStart" | "auth/loginSuccess" | "auth/loginFailed"; }) => void,router: string[] | AppRouterInstance) => {

export const logOut = async (dispatch: (arg0: { payload: any; type: "auth/logOutStart" | "auth/logOutSuccess" | "auth/logOutFailed"; }) => void, id: any, token: any, axios: { post: (arg0: string, arg1: any, arg2: { headers: { token: string; }; }) => any; },router: string[]|AppRouterInstance) => {
  dispatch(logOutStart());
  try {
    
    await UserAPI.logout({id},token);

    dispatch(logOutSuccess());
    // router.push("/")
  } catch (err) {
    dispatch(logOutFailed());
    console.log(err)
  }
};

