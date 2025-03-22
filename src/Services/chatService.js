import axios from "axios";

const API_BASE = "http://localhost:8000/api/";

// Function to get the token from localStorage
const getAuthToken = () => localStorage.getItem("access_token");

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor to attach Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // Return response normally
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request - possible expired token.");
      localStorage.removeItem("access_token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// ✅ API functions

export const uploadBPMN = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const sendQuery = async (bpmid, query) => {
  return axiosInstance.post("send_query/", { bpmid, query });
};

export const fetchChats = async () => {
    try {
      const response = await axiosInstance.get("chats/");
    
    //   console.log("in chatService" );
    //   console.log( response.data);

      return response.data || []; // Ensure it returns an array
    } catch (error) {
      console.error("Error fetching chats:", error);
      return []; // Return an empty array on error to prevent crashes
    }
  };
  

  export const fetchChatMessages = async (bpmid) => {
    try {
      const response = await axiosInstance.get(`chats/${bpmid}/`);

      console.log("in chatMessage in service" );
      console.log( response.data);

      return response.data || []; // Ensure it always returns an array
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      return []; // Return an empty array on error to prevent crashes
    }
  };
  

  export const deleteChat = async (bpmid) => {
    return axiosInstance.delete(`chats/${bpmid}/delete/`);
  };
  

export default axiosInstance;
