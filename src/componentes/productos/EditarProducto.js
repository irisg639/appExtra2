import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        name: '', 
        brand: '', 
        price: '',
        stock: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://184.72.119.254/productos/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setForm(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch(`https://184.72.119.254/productos/editar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }

            navigate('/productos', {
                state: { message: 'Producto actualizado correctamente' }
            });
        } catch (err) {
            setError(err.message);
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
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
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Editar Producto</h3>
                    <Button variant="light" onClick={handleBack}>
                        <FaArrowLeft className="me-1" /> Volver
                    </Button>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={form.marca}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={form.precio}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                step="1"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={handleBack}
                                disabled={isSubmitting}
                            >
                                <FaTimes className="me-1" /> Cancelar
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" /> Guardando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="me-1" /> Guardar Cambios
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditProduct;
