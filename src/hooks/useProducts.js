import { useState, useEffect } from 'react';
import { getAllProducts} from '../services/ProductService';

function useProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);
    return { products};
}

export default useProducts;
