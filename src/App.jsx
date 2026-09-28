import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom"
import Layout from "./components/Layout"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import Cart from "./components/Cart"
import NotFound from "./components/NotFound"
import "./App.css"

// Organiza la navegación mediante un layout y rutas anidadas.
function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    index
                    element={
                        <ItemListContainer
                            greeting="Joyas para quienes hacen de su identidad una estética"
                        />
                    }
                />

                <Route
                    path="category/:categoryId"
                    element={
                        <ItemListContainer
                            greeting="Explorá nuestra selección"
                        />
                    }
                />

                <Route
                    path="item/:itemId"
                    element={<ItemDetailContainer />}
                />

                <Route
                    path="cart"
                    element={<Cart />}
                />

                <Route
                    path="admin"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Route>
        </Routes>
    )
}

export default App
