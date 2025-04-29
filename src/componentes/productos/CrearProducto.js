import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

function CreateProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: '',
        marca: '',
        precio: '',
        stock: ''
    });

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            // Reemplaza con tu endpoint real
            const response = await fetch('http://184.72.119.254/productos/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            navigate('/productos', {
                state: { message: 'Producto creado correctamente' }
            });
        } catch (err) {
            setError(err.message);
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Crear Nuevo Producto</h3>
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
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="marca"
                                value={form.marca}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
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
                                variant="success"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" /> Creando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="me-1" /> Crear Producto
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

export default CreateProduct;