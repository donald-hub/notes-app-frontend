import {Routes, Route} from "react-router";
import HomePage from "./pages/HomePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import CreatePage from "./pages/createPage.jsx";
import EditNote from "./pages/EditNote.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const App = () => {
  return (
    <div>
    <Routes>
  {/* Protected routes */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/notes/:id"
    element={
      <ProtectedRoute>
        <NoteDetailPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/create"
    element={
      <ProtectedRoute>
        <CreatePage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/update/:id"
    element={
      <ProtectedRoute>
        <EditNote />
      </ProtectedRoute>
    }
  />

  {/* Public auth routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>

    </div>
  )
}

export default App