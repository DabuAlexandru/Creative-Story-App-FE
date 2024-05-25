import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../utils/providers/UserContextProvider";
import Layout from "@/components/custom/Layout/Layout";
import MyStories from "@/pages/myStories/MyStories";
import Register from "@/pages/register/Register";
import Login from "@/pages/login/Login";
import Discover from "@/pages/discover/Discover";
import ViewProfile from "@/pages/viewProfile/ViewProfile";
import EditProfile from "@/pages/editProfile/EditProfile";
import LandingPage from "@/pages/landingPage/LandingPage";
import AddEditStoryContent from "@/pages/addEditStoryContent/AddEditStoryContent";
import AddEditStoryObject from "@/pages/addEditStoryObject/AddEditStoryObject";
import ViewStory from "@/pages/viewStory/ViewStory";

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
            <Discover />
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
        path="/view-story/:storyId"
        element={
          <PrivateRoute>
            <ViewStory />
          </PrivateRoute>
        }
      />
      <Route
        path="/read-story/:storyId"
        element={
          <PrivateRoute>
            <ViewStory />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-edit-story/:storyId"
        element={
          <PrivateRoute>
            <AddEditStoryObject />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-edit-story"
        element={
          <PrivateRoute>
            <AddEditStoryObject />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-edit-story-content/:storyId"
        element={
          <PrivateRoute>
            <AddEditStoryContent />
          </PrivateRoute>
        }
      />
      <Route
        path="/view-profile/:profileId"
        element={
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/view-profile"
        element={
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <LandingPage />
        }
      />
    </Routes>
  );
};

export default RoutesProvider;
