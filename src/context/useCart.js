import { useContext } from "react"
import { CartContext } from "./CartContext"

// Facilita el acceso al carrito y valida que exista un Provider.
function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error(
            "useCart debe utilizarse dentro de CartProvider.",
        )
    }

    return context
}

export { useCart }
