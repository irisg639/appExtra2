import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Container, Card, Button, Alert, Spinner, ListGroup } from 'react-bootstrap';

function ViewProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://184.72.119.254/productos/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="info" />
                <p className="mt-2">Cargando producto...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                    <Button variant="link" onClick={handleBack}>Volver atrás</Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Detalles del Producto</h3>
                    <Button variant="light" onClick={handleBack}>
                        <FaArrowLeft className="me-1" /> Volver
                    </Button>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Nombre:</strong> {product.nombre}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Marca:</strong> {product.marca}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Precio:</strong> ${parseFloat(product.precio).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Stock disponible:</strong> {product.stock}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ViewProduct;
