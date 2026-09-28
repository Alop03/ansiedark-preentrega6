import { FiShoppingBag } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useCart } from "../context/useCart"

// Muestra la cantidad total de unidades guardadas en el carrito global.
function CartWidget() {
    const { totalItems } = useCart()

    const textoAccesible = totalItems === 1
        ? "Carrito con 1 producto"
        : `Carrito con ${totalItems} productos`

    return (
        <Link
            className="carrito"
            to="/cart"
            aria-label={textoAccesible}
        >
            <FiShoppingBag
                className="carrito__icono"
                aria-hidden="true"
            />

            {totalItems > 0 && (
                <span
                    className="carrito__cantidad"
                    aria-live="polite"
                >
                    {totalItems}
                </span>
            )}
        </Link>
    )
}

export default CartWidget