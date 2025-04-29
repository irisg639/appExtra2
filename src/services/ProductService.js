const BASE_URL = "https://18.116.62.128/";

export async function getAllProducts() {
    const response = await fetch(BASE_URL + 'products/');
    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(BASE_URL + `products/${id}`);
    return response.json();
}

export async function createProduct(product) {
    const response = await fetch(BASE_URL + 'products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return response.json();
}

export async function updateProduct(id, product) {
    const response = await fetch(BASE_URL + `products/edit/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return response.json();
}

export async function deleteProduct(id) {
    await fetch(BASE_URL + `products/delete/${id}`, {
        method: 'DELETE',
    });
}
