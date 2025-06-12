import { BrowserRouter } from "react-router-dom";
import Queries from "./config/queries.config.jsx";
import AppContent from "./app/AppContent";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import { AnimatePresence } from "motion/react";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Queries>
        <AnimatePresence>
          <AppContent />
        </AnimatePresence>
      </Queries>
    </BrowserRouter>
  )
}

export default App
