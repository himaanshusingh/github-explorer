import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * App Component
 * 
 * The root container component of the React application.
 * It configures the global routing system using react-router-dom, mapping
 * specific URL paths to their corresponding page components (Index for home,
 * NotFound for undefined routes).
 */

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
