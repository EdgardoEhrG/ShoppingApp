import CreateProductFab from './products/create-product-fab';
import ProductList from './products/product-list';

export default async function Home() {
  return (
    <>
      <ProductList />
      <CreateProductFab />
    </>
  );
}
