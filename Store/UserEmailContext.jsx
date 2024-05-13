// UserEmailContext.js
import { createContext, useEffect, useState } from 'react';

const UserEmailContext = createContext();

const UserEmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail')||'');
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  useEffect(()=>{
    localStorage.setItem('userEmail',userEmail);
  },[userEmail]);

  const login = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const logout=()=>{
    setUserEmail('');
    setIsLoggedIn(false);
    localStorage.removeItem('userEmail');
  }

  const value = {
    userEmail,
    login,
    logout,
    isLoggedIn
  };

  return (
    <UserEmailContext.Provider value={value}>
      {children}
    </UserEmailContext.Provider>
  );
};

export default UserEmailContext;
export { UserEmailProvider };