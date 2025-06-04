import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shop from "./pages/Shop/Shop";
import "./App.css";

// Componente para proteger rutas (opcional para futuras implementaciones)


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta de tienda */}
        <Route 
          path="/shop" 
          element={
            // <ProtectedRoute> // Descomentar cuando implementes autenticación
              <Shop />
            // </ProtectedRoute>
          } 
        />
        
        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;