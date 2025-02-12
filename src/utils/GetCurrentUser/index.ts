import Cookies from "js-cookie";

export const getCurrentUser = () => {
  try {
    const cookieData = Cookies.get("current_user"); // Get cookie once
    if (!cookieData || cookieData.trim() === "") {
      return null; // Check for empty values
    }
    return JSON.parse(cookieData); // Parse valid JSON
  } catch (error) {
    return null; // Return null on JSON parsing error
  }
};
