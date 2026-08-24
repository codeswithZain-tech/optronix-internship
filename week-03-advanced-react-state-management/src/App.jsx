import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "15px 20px",
          borderBottom: "1px solid #444",
          background: "#1e1e1e",
        }}
      >
        <Link to="/tasks" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Tasks
        </Link>
        <Link to="/team" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Team
        </Link>
        <Link to="/settings" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Settings
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: "tasks", element: <Tasks /> },
      { path: "tasks/:id", element: <TaskDetail /> },
      { path: "team", element: <Team /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
