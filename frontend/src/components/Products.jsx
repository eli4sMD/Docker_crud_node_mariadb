import {useEffect, useState} from 'react';
import "./products.css";

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            console.log(data);
            if(data.error)return;
            setProductos(data.products);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };

    const agregarProducto = async () => {
        try {
            await fetch('http://localhost:3000/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, precio }),
            });
            obtenerProductos();
            setNombre('');
            setPrecio('');
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await fetch(`http://localhost:3000/product/${id}`, {
                method: 'DELETE',
            });
            obtenerProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const mostrarFormularioActualizar = (producto) => {
        setSelectedProduct(producto);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setShowUpdateForm(true);
    };

    const actualizarProducto = async () => {
        try {
            const response = await fetch(`http://localhost:3000/product/${selectedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, precio }),
            });

            if (response.ok) {
                obtenerProductos();
                setNombre('');
                setPrecio('');
                setShowUpdateForm(false);
            } else {
                console.error('Error al actualizar el producto');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2>Agregar Producto</h2>
            <div className="input-container">
                <input type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
                <input type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
                <button onClick={agregarProducto}>Agregar</button>
                {selectedProduct && (
                    <button onClick={actualizarProducto}>Actualizar</button>
                )}
            </div>

            <h2>Lista de Productos</h2>
            <div className="cards-container">
                {productos.length && productos.map((producto) => (
                    <div className="card" key={producto.id}>
                        <h3>{producto.nombre}</h3>
                        <p>Precio: ${producto.precio}</p>
                        <div className="button-container">
                            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                            <button onClick={() => mostrarFormularioActualizar(producto)}>Actualizar</button>
                        </div>
                    </div>
                ))}
            </div>

            {showUpdateForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Actualizar Producto</h2>
                        <input type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
                        <input type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
                        <button onClick={actualizarProducto}>Actualizar</button>
                        <button onClick={() => setShowUpdateForm(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products