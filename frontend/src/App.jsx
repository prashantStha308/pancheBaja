import { BrowserRouter } from "react-router-dom";
import Queries from "./config/queries.config.jsx";
import AppContent from "./app/AppContent";

function App() {

  return (
    <BrowserRouter>
      <Queries>
        <AppContent />
      </Queries>
    </BrowserRouter>
  )
}

export default App
