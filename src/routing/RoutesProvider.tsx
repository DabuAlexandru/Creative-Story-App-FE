import { ReactNode, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext, UserContextProps } from "../utils/providers/UserContextProvider";
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
import ReadStory from "@/pages/readStory/ReadStory";
import SeeDiscussions from "@/pages/seeDiscussions/SeeDiscussions";
import ThreadsOfDiscussion from "@/pages/threadsOfDiscussion/ThreadsOfDiscussion";
import ThreadsProvider from "@/utils/providers/ThreadsProvider/ThreadsProvider";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useContext<UserContextProps>(UserContext);
  if (!isLogged) {
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
            <ReadStory />
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
        path="/see-discussions/of-author/:authorId"
        element={
          <PrivateRoute>
            <></>
          </PrivateRoute>
        }
      />
      <Route
        path="/see-discussions/of-story/:storyId"
        element={
          <PrivateRoute>
            <></>
          </PrivateRoute>
        }
      />
      <Route
        path="/see-threads/of-discussion/:discussionId"
        element={
          <PrivateRoute>
            <ThreadsProvider>
              <ThreadsOfDiscussion />
            </ThreadsProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/see-discussions/explore-thread/:threadId"
        element={
          <PrivateRoute>
            <></>
          </PrivateRoute>
        }
      />
      <Route
        path="/see-discussions"
        element={
          <PrivateRoute>
            <SeeDiscussions />
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
