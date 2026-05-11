import { apiService } from './api';

export const authService = {
  register: async (userData) => {
    return await apiService.post('/v1/createUser', userData);
  },

  login: async (credentials) => {
    const response = await apiService.post('/v1/login_user', credentials);
  console.log("User profile fetched:", response);
    if (response && response.token) {
      const token = response.token;
      localStorage.setItem('png71-user', token);
      apiService.setToken(token);
    }

    return response;
  },
 

  getProfile: async () => {
    try {
      const response = await apiService.get('/v1/user_details');
  console.log("User profile fetched:", response);
      // Handle different response structures
      if (response.data) {
        return response.data; // If backend returns { success: true, data: user }
      } else if (response.user) {
        return response.user; // If backend returns { user }
      } else {
        return response; // If backend returns user object directly
      }
    } catch (error) {
      console.error("getProfile error:", error);
      throw error;
    }
  },

  changePassword: async (passwordData) => {
    // return await apiService.put('/auth/register_sub_admin', passwordData);
  },

  logout: () => {
    localStorage.removeItem('png71-user');
    apiService.setToken(null);
  },

  setToken: (token) => {
    apiService.setToken(token);
    if (token) {
      localStorage.setItem('png71-user', token);
    } else {
      localStorage.removeItem('png71-user');
    }
  },

  init() {
    const token = localStorage.getItem('png71-user');
    if (token) {
      this.setToken(token);
      return token;
    }
    return null;
  }
};

export default authService;