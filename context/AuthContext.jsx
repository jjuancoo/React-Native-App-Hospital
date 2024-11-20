//En este archivo se define el context para la autenticacion en la app
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Creando el state para el token
  const [token, setToken] = useState(null);

  //Carga el token una vez que se inicie la app
  useEffect(() => {
    const loadToken = async () => {
      //Verifica si hay un token almacenado en el async storage
      const storedToken = await AsyncStorage.getItem('token');
      if(storedToken){
        setToken(storedToken)
        setIsAuthenticated(true);
      }
    };
    loadToken();
  }, [])

  const signIn = async (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    //Almacena el token en el async storage
    await AsyncStorage.setItem('token', newToken);
  };

  const signOut = async () => {
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('token')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

