import { Link } from "react-router-dom"
import { useCart } from "../context/useCart"
import "./Cart.css"

// Presenta el contenido del carrito y sus operaciones principales.
function Cart() {
    const {
        cart,
        removeItem,
        clear,
        totalItems,
        totalPrice,
    } = useCart()

    function formatearPrecio(precio) {
        return new Intl.NumberFormat("es-UY", {
            style: "currency",
            currency: "UYU",
            maximumFractionDigits: 0,
        }).format(precio)
    }

    if (cart.length === 0) {
        return (
            <section className="carrito-vista carrito-vista--vacio">
                <p className="carrito-vista__etiqueta">
                    Tu selección
                </p>

                <h1 className="carrito-vista__titulo">
                    Tu carrito está vacío
                </h1>

                <p className="carrito-vista__descripcion">
                    Todavía no elegiste ninguna joya.
                    Explorá el catálogo y encontrá una pieza
                    para sumar a tu selección.
                </p>

                <Link
                    className="carrito-vista__volver"
                    to="/"
                >
                    Explorar el catálogo
                </Link>
            </section>
        )
    }

    return (
        <section className="carrito-vista">
            <header className="carrito-vista__encabezado">
                <div>
                    <p className="carrito-vista__etiqueta">
                        Tu selección
                    </p>

                    <h1 className="carrito-vista__titulo">
                        Carrito de compras
                    </h1>
                </div>

                <p className="carrito-vista__resumen">
                    {totalItems} unidades seleccionadas
                </p>
            </header>

            <div className="carrito-vista__contenido">
                <div className="carrito-lista">
                    {cart.map((producto) => {
                        const {
                            id,
                            name,
                            img,
                            price,
                            quantity,
                        } = producto

                        const subtotal = price * quantity

                        return (
                            <article
                                className="carrito-item"
                                key={id}
                            >
                                <img
                                    className="carrito-item__imagen"
                                    src={img}
                                    alt={name}
                                />

                                <div className="carrito-item__informacion">
                                    <h2 className="carrito-item__nombre">
                                        {name}
                                    </h2>

                                    <p className="carrito-item__dato">
                                        Precio unitario:{" "}
                                        {formatearPrecio(price)}
                                    </p>

                                    <p className="carrito-item__dato">
                                        Cantidad: {quantity}
                                    </p>

                                    <p className="carrito-item__subtotal">
                                        Subtotal:{" "}
                                        {formatearPrecio(subtotal)}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="carrito-item__eliminar"
                                    onClick={() => removeItem(id)}
                                    aria-label={`Eliminar ${name} del carrito`}
                                >
                                    Eliminar
                                </button>
                            </article>
                        )
                    })}
                </div>

                <aside className="carrito-total">
                    <p className="carrito-total__etiqueta">
                        Resumen de compra
                    </p>

                    <div className="carrito-total__fila">
                        <span>Unidades</span>
                        <strong>{totalItems}</strong>
                    </div>

                    <div className="carrito-total__fila carrito-total__fila--principal">
                        <span>Total</span>
                        <strong>
                            {formatearPrecio(totalPrice)}
                        </strong>
                    </div>

                    <button
                        type="button"
                        className="carrito-total__finalizar"
                        disabled
                    >
                        Finalizar compra próximamente
                    </button>

                    <button
                        type="button"
                        className="carrito-total__vaciar"
                        onClick={clear}
                    >
                        Vaciar carrito
                    </button>

                    <Link
                        className="carrito-total__continuar"
                        to="/"
                    >
                        Continuar comprando
                    </Link>
                </aside>
            </div>
        </section>
    )
}

export default Cart