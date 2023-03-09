import axios from "axios";
import {createContext, useEffect, useState} from "react";
import {AUTH_URL} from "../constant/api";

if (process.env.REACT_APP_ENV === 'local') axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_BEARER_TEST

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState('NOT_LOGGED_IN')
    const getAuth = (() => {
        axios.get(AUTH_URL).then(res => {
            if(res.status === 200) {
                setAuth('AUTHORIZED')
            }
        }).catch(er => {
            setAuth('UNAUTHORIZED')
            console.log('User not authorized')
        })
    })
    useEffect(() => {
        getAuth()
    }, [])
    return (<AuthContext.Provider value={{auth, getAuth}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthProvider