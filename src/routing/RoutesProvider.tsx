import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../utils/providers/UserContextProvider";

const PrivateRoute = ({ children }: { children: any }) => {
  const { isLogged } = useContext<any>(UserContext);
  return isLogged ? children : <Navigate to="/login" />;
}

const Login = () => <div>Login Mock</div>
const Dashboard = () => <div>Dashboard Mock</div>

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesProvider;
