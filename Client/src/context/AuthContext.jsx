import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUser({ token });  // Store the token in the user state
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    Cookies.set('token', token, { expires: 7 });  // Set the token in cookies (valid for 7 days)
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');  // Remove the token from cookies
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
