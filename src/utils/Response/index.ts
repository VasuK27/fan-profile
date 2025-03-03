import { SOMETHING_WENT_WRONG } from "constant/ErrorMessages";
import { getRequest } from "helper/AxiosClient";
import { errorNotification } from "helper/Notification";
import { GetResponseParams } from "interfaces/global";

/**
 * Fetches data from an endpoint with optional query parameters.
 *
 * @param {GetResponseParams} params Parameters for the request.
 * @returns {Promise<any>} The response from the API.
 */
export async function getResponse({
  apiEndPoint,
  queryString = "",
  navigate,
}: GetResponseParams): Promise<any> {
  try {
    const response = await getRequest(
      `${apiEndPoint}?${queryString}`,
      {},
      navigate
    );
    return response;
  } catch (err) {
    errorNotification(SOMETHING_WENT_WRONG);
    throw err;
  }
}
