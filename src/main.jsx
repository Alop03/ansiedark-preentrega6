import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import "./index.css"
import App from "./App.jsx"

// Los providers habilitan navegación y estado global en toda la aplicación.
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <App />
            </CartProvider>
        </BrowserRouter>
    </StrictMode>,
)