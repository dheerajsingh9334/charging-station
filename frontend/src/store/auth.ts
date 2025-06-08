import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/AuthService';
import { useToast } from 'vue-toastification';

interface UserPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast();
  
  // State
  const token = ref<string | null>(null);
  const user = ref<UserPayload | null>(null);
  const loading = ref(false);
  
  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  
  // Actions
async function login(email: string, password: string) {
  try {
    loading.value = true;
    const response = await AuthService.login(email, password);

    // response is already the data object!
    if (response?.token) {
      setToken(response.token);
      toast.success('Login successful');
      return true;
    }

    toast.error('Invalid response from server');
    return false;
  } catch (error: any) {
    toast.error(error.message || 'Login failed');
    return false;
  } finally {
    loading.value = false;
  }
}

  
async function register(email: string, password: string, name: string) {
  try {
    loading.value = true;
    const response = await AuthService.register(email, password, name);

    // Only return true if registration is successful and NOT auto-login
    if (response.success) {
      toast.success(response.message || 'Registration successful! Please login.');
      return true;
    }
    toast.error(response?.message || 'Registration failed: Unknown error');
    return false;
  } catch (error: any) {
    toast.error(error.message || 'Registration failed');
    return false;
  } finally {
    loading.value = false;
  }
}

  
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    toast.info('You have been logged out');
  }
  
 function checkAuth() {
    // console.log('Running checkAuth...');
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    try {
      const decoded = jwtDecode<UserPayload>(storedToken);
      const currentTime = Date.now() / 1000;

      // console.log("🕒 Token exp:", decoded.exp, " | Current time:", currentTime);

      if (decoded.exp < currentTime) {
        console.warn("⚠️ Token expired, logging out");
        logout();
        return false;
      }

      // Valid token
      setToken(storedToken);
      return true;
    } catch (error) {
      console.error("❌ Invalid token in checkAuth:", error);
      logout();
      return false;
    }
  }

  return false;
}

  
function setToken(newToken: string) {
  token.value = newToken;
  localStorage.setItem('token', newToken);

  try {
    const decoded = jwtDecode<UserPayload>(newToken);
    // console.log("✅ Decoded token in setToken:", decoded);
    user.value = decoded;
  } catch (error) {
    console.error('❌ Failed to decode token', error);
  }
}

  
  return {
    // State
    token,
    user,
    loading,
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    setToken
  };
});