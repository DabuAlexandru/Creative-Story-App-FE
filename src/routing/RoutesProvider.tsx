import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../utils/providers/UserContextProvider";
import Layout from "@/components/custom/Layout/Layout";

const PrivateRoute = ({ children }: { children: any }) => {
  const state = useContext<any>(UserContext);
  if (!state.isLogged) {
    return <Navigate to="/login" />;
  }
  return <Layout>{children}</Layout>
}

const Login = () => <div>Login Mock</div>
const Dashboard = () => <div>Dashboard Mock</div>

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
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
