import { createContext, useState, useEffect ,useContext } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if(token && userData){
        setUser(userData);
    }
  }, []);

  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser("");


  }

  return (
    <AuthContext.Provider value={{ user, setUser ,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>{
    return useContext(AuthContext);
}
