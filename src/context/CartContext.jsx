import {
    createContext,
    useState,
} from "react"

const CartContext = createContext(null)

// Centraliza el carrito y expone operaciones inmutables para modificarlo.
function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    function addItem(item, quantity) {
        setCart((carritoAnterior) => {
            const itemExistente = carritoAnterior.find(
                (producto) => producto.id === item.id,
            )

            if (itemExistente) {
                return carritoAnterior.map((producto) => {
                    if (producto.id === item.id) {
                        const cantidadActualizada = Math.min(
                            producto.quantity + quantity,
                            item.stock,
                        )

                        return {
                            ...producto,
                            quantity: cantidadActualizada,
                        }
                    }

                    return producto
                })
            }

            const cantidadInicial = Math.min(
                quantity,
                item.stock,
            )

            return [
                ...carritoAnterior,
                {
                    ...item,
                    quantity: cantidadInicial,
                },
            ]
        })
    }

    function removeItem(itemId) {
        setCart((carritoAnterior) =>
            carritoAnterior.filter(
                (producto) => producto.id !== itemId,
            ),
        )
    }

    function clear() {
        setCart([])
    }

    function isInCart(itemId) {
        return cart.some(
            (producto) => producto.id === itemId,
        )
    }

    const totalItems = cart.reduce(
        (acumulador, producto) =>
            acumulador + producto.quantity,
        0,
    )

    const totalPrice = cart.reduce(
        (acumulador, producto) =>
            acumulador + producto.price * producto.quantity,
        0,
    )

    const value = {
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalItems,
        totalPrice,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}



export {
    CartContext,
    CartProvider,
}
