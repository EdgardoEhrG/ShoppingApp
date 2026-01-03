import { Grid } from '@mui/material';
import { getProducts } from './product-actions';
import Product from './product';

const ProductList = async () => {
  const products = await getProducts();

  return (
    <Grid container spacing={3}>
      {products.map((product) => {
        return (
          <Grid key={product.id}>
            <Product product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductList;
