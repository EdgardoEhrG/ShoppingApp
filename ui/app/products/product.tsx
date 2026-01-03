import { Card, Typography } from '@mui/material';
import type { Product as ProductType } from '../types';

interface ProductProps {
  product: ProductType;
}

const Product = async ({ product }: ProductProps) => {
  return (
    <Card className="p-4">
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography>{product.price}</Typography>
    </Card>
  );
};

export default Product;
