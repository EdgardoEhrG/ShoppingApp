'use client';

import { getProducts } from './product-actions';
import ProductsGrid from './products-grid';

// eslint-disable-next-line @next/next/no-async-client-component
const ProductList = async () => {
  const products = await getProducts();

  return <ProductsGrid products={products} />;
};

export default ProductList;
