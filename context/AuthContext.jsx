//En este archivo se define el context para la autenticacion en la app
import React, { useContext, useState, createContext, Children } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticate, setIsAuthenticate] = useState(false)

    const signIn = () => {
        setIsAuthenticate(true)
    }

    const signOut = () => {
        setIsAuthenticate(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticate, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);