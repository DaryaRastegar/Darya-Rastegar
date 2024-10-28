import Router from "./router/Router";
import TanstackQueryProvider from "./providers/TanstackQueryProvider";
import "./App.css";
import { QueryClient } from "@tanstack/react-query";

function App() {
 
  return (
    <TanstackQueryProvider >
      <Router />
    </TanstackQueryProvider>
  );
}

export default App;
