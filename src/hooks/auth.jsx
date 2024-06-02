import {createContext, useContext, useState} from 'react'

import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){

    async function signIn({email, password}){
        try{
            const response = await api.post("/sessions", { email, password})

            api.defaults.headers.authorization = `Bearer ${token}`

        }catch(error){
            if(error.response){
                console.log(error.response.data.message)
            }else{
                alert("Não foi possível entrar")
            }
        }
    }

    return (
        <AuthContext.Provider value={{signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
}

export {AuthProvider, useAuth}