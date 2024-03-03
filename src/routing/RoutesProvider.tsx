import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../utils/providers/UserContextProvider";
import Layout from "@/components/custom/Layout/Layout";
import MyStories from "@/pages/myStories/MyStories";
import Register from "@/pages/register/Register";
import Login from "@/pages/login/Login";

const PrivateRoute = ({ children }: { children: any }) => {
  const state = useContext<any>(UserContext);
  if (!state.isLogged) {
    return <Navigate to="/login" />;
  }
  return <Layout>{children}</Layout>
}

const Dashboard = () => <div>Dashboard Mock</div>

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/discover"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-stories"
        element={
          <PrivateRoute>
            <MyStories />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-edit-story"
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
