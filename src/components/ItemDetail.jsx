import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/useCart"
import ItemCount from "./ItemCount"
import "./ItemDetail.css"

// Presenta el producto y conecta la selección con el carrito global.
function ItemDetail({ item }) {
    const [mensaje, setMensaje] = useState("")
    const { addItem, isInCart } = useCart()

    const {
        name,
        price,
        category,
        img,
        stock,
        description,
    } = item

    const precioFormateado = new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 0,
    }).format(price)

    function agregarCantidad(cantidad) {
        const productoYaAgregado = isInCart(item.id)

        addItem(item, cantidad)

        const textoUnidad = cantidad === 1
            ? "unidad"
            : "unidades"

        const textoAccion = productoYaAgregado
            ? "actualizada en el carrito"
            : "agregada al carrito"

        setMensaje(
            `${cantidad} ${textoUnidad} de ${name}: cantidad ${textoAccion}.`,
        )
    }

    return (
        <article className="detalle">
            <div className="detalle__imagen-contenedor">
                <img
                    className="detalle__imagen"
                    src={img}
                    alt={name}
                />
            </div>

            <div className="detalle__informacion">
                <p className="detalle__categoria">
                    {category}
                </p>

                <h3 className="detalle__nombre">
                    {name}
                </h3>

                <p className="detalle__descripcion">
                    {description}
                </p>

                <p className="detalle__precio">
                    {precioFormateado}
                </p>

                <p className="detalle__stock">
                    Stock disponible: {stock}
                </p>

                <ItemCount
                    initial={1}
                    stock={stock}
                    onAdd={agregarCantidad}
                />

                {mensaje && (
                    <div className="detalle__confirmacion">
                        <p
                            className="detalle__mensaje"
                            role="status"
                        >
                            {mensaje}
                        </p>

                        <Link
                            className="detalle__ir-carrito"
                            to="/cart"
                        >
                            Ver carrito
                        </Link>
                    </div>
                )}
            </div>
        </article>
    )
}

export default ItemDetail