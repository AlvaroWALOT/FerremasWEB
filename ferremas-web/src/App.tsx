import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/Home/Home";

function App() {
  return(
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App;