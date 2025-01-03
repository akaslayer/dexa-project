import { Employee } from "@/utils/Interface/Employee";
import { LoginRequest, LoginResponse } from "@/utils/Interface/Login";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  token: string | null;
  userData: Employee | null;
  Login: (data: LoginRequest) => Promise<LoginResponse>;
  Logout: () => void;
  fetchUserData: () => Promise<void>;
}

const defaultContextValue: AuthContextType = {
  isAuthenticated: false,
  role: null,
  token: null,
  userData: null,
  Login: async () => ({ token: "", role: "" }),
  Logout: () => {},
  fetchUserData: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (storedToken && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < parseInt(expirationTime)) {
        setToken(storedToken);
        setIsAuthenticated(true);
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
      } else {
        localStorage.removeItem("site");
        localStorage.removeItem("tokenExpiration");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const Login = async (formData: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const tokenExpirationTime = Date.now() + 3600000;

      setToken(data.token);
      setRole(data.role);
      setIsAuthenticated(true);
      localStorage.setItem("site", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("tokenExpiration", tokenExpirationTime.toString());

      await fetchUserData();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const fetchUserData = async (): Promise<void> => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:4000/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const Logout = () => {
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("site");
    localStorage.removeItem("role");
    localStorage.removeItem("tokenExpiration");
  };

  const value = {
    isAuthenticated,
    role,
    token,
    userData,
    Login,
    Logout,
    fetchUserData,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
