import React, { createContext, useState } from 'react'
export const UserDataContext = createContext();

const UserContext = ({children}) => {
    // const user = "sarthak"
    const [user,setuser] = useState({
        email: '',
        fullName:{
            firstname: '',
            lastname: ''
        }
    })
  return (
    <div>
        {/* i have created a user with name sarthak now if i want to use this user in any of the file then i app.js*/}
      <UserDataContext.Provider value={[user,setuser]}> 
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
