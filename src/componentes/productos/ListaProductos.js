import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Container, Card, Button, Table, Alert, Modal, Spinner } from 'react-bootstrap';

function Productos() {
    const { logout, user } = useAuth();
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://184.72.119.254/productos');

            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEdit = (id) => {
        navigate(`/productos/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/productos/view/${id}`);
    };

    const confirmDelete = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            // Reemplaza esta URL con tu endpoint real
            const response = await fetch(`https://184.72.119.254/productos/eliminar/${productToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            // Actualizar el estado local
            setProducts(products.filter(product => product.id !== productToDelete));
            setShowDeleteModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreate = () => {
        navigate('/productos/create');
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando lista de productos...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <strong>Error:</strong> {error}
                    <div className="mt-2">
                        <Button variant="primary" onClick={fetchProducts}>
                            Reintentar
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que deseas eliminar este producto? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className="shadow">
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">
                            <i className="fas fa-boxes me-2"></i> Lista de Productos
                        </h3>
                        <div>
                            <Button variant="light" onClick={handleBack} className="me-2">
                                <FaHome className="me-1" /> Inicio
                            </Button>
                            <Button variant="success" onClick={handleCreate} className="me-2">
                                <FaPlus className="me-1" /> Nuevo
                            </Button>
                            <Button variant="danger" onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" /> Salir
                            </Button>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body>
                    {products.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            No hay productos registrados. Crea tu primer producto.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.nombre}</td>
                                            <td>{product.marca}</td>
                                            <td>${product.precio.toFixed(2)}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleView(product.id)}
                                                >
                                                    <FaEye /> Ver
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(product.id)}
                                                >
                                                    <FaEdit /> Editar
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => confirmDelete(product.id)}
                                                >
                                                    <FaTrash /> Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Productos;