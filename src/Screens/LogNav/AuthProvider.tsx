import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        setIsLogged(true);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('access_token', token);
    setIsLogged(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};
