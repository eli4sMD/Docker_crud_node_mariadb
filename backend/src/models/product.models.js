console.log('Models');

const pool = require('../database/connection.database');

async function getAllProducts() {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        const rows = await dbConnection.query('SELECT * FROM products');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

async function insertProduct( nombre, precio ) {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                precio DECIMAL(10, 2) NOT NULL
            )
        `);
        await dbConnection.query('INSERT INTO products (nombre, precio) VALUES (?, ?)', [nombre, precio]);
        return { mensaje: 'Producto insertado correctamente' };
    } catch (error) {
        
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

async function deleteProduct(id) {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query('DELETE FROM products WHERE id = ?', [id]);
        return { mensaje: 'Producto eliminado correctamente' };
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

async function updateProduct(id, nombre, precio) {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query('UPDATE products SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id]);
        return { mensaje: 'Producto actualizado correctamente' };
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

module.exports = {
    getAllProducts,
    insertProduct,
    deleteProduct,
    updateProduct,
};