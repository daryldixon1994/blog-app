import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/MyBlogs";
import AdminDdhboard from "./pages/AdminDashboard";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/myBlogs/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDdhboard />
            </AdminRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <Blogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PrivateRoute>
              <SingleBlog />
            </PrivateRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
