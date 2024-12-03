import axios, {InternalAxiosRequestConfig} from "axios";

export interface ServerError {
	message: string;
	errors: string[] | null;
	fieldErrors: string[] | null;
}

const useToken = (req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("userToken");
  if (token && token !== "null") {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}

export const axiosInstance = axios.create({})
axiosInstance.interceptors.request.use(useToken)

export const axiosFormDataInstance = axios.create({
	headers: {
		"Content-Type": "multipart/form-data",
	}
})
axiosFormDataInstance.interceptors.request.use(useToken)