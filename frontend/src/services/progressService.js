import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const getDashboardData = async () => {
  try {
    const resposne = await axiosInstance.get(API_PATHS.PROGRESS.GET_DASHBOARD);
    console.log(resposne.data);
    return resposne.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch dashboard data" };
  }
};

const progressService = { getDashboardData };

export default progressService;
