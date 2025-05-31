import React, { createContext } from 'react'
export const AuthDataContext  = createContext()
const ServerUrl = 'http://localhost:3000';
let value ={ 
    ServerUrl
}
const AuthContext = ({children}) => {
  return (
    <>
    <AuthDataContext.Provider value={value}>
    {children}
    </AuthDataContext.Provider>
    </>
  )
}

export default AuthContext