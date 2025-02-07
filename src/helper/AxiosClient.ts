import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { loginRoute } from "constant/RoutesEndPoint";
import { errorNotification } from "./Notification";

const baseURL = "https://api.jolpi.ca/ergast/f1/2024"; // Replace with your actual base URL

// Define a common response type for all requests
interface ApiResponse<T> {
  type: number;
  response?: AxiosResponse<T>;
  errors?: string;
  errormessage?: string;
}

export const axiosClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function unAuthorized(navigate: Function): void {
  localStorage.clear();
  navigate(loginRoute.LOGIN_ROUTE);
}

export async function getRequest<T>(
  URL: string,
  params: Record<string, any>,
  navigate: Function
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosClient.get<T>(`/${URL}`, { params });
    return { type: 1, response };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      if (axiosError.response.status === 401) {
        unAuthorized(navigate);
      }
      return {
        type: 0,
        errors: axiosError.message,
        errormessage: axiosError.response.data as string, // Ensure type safety
      };
    } else {
      errorNotification(axiosError.message);
      return { type: 0, errors: axiosError.message };
    }
  }
}
