import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
// import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { PostDetailPage } from "./pages/PostDetail/PostDetailPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { MessagesPage } from "./pages/Message/MessagesPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/posts" replace /> }, // Auto-redirect Home to Feed
      { path: "posts", element: <FeedPage /> },
      { path: "posts/:postId", element: <PostDetailPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;