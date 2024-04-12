import { createRoot } from "react-dom/client";
import App from './App'
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
root.render(
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <App/>
        </CartContextProvider> 
      </AuthContextProvider> 
    </BrowserRouter>
    )