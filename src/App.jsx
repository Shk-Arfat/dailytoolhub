// D:\DailyTool\dailytools-hub\src\App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ToolLoader from './components/ToolLoader';
import CategoryPage from './pages/CategoryPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';


function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/:toolName" element={<ToolLoader />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;