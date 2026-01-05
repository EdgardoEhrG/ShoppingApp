import { Card, CardActionArea, Stack, Typography } from '@mui/material';
import type { Product as ProductType } from '../types';
import Image from 'next/image';
import { getProductImg } from './product-actions';
import { useRouter } from 'next/router';

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const router = useRouter();

  const navigateToProductPage = () => {
    router.push(`products/${product.id}`);
  };

  return (
    <CardActionArea onClick={navigateToProductPage}>
      <Card className="p-4">
        <Stack gap={3}>
          <Typography variant="h4">{product.name}</Typography>
          {product.isThereImg && (
            <Image
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-auto"
              src={getProductImg(product.id)}
              alt="product-ing"
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>{product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
};

export default Product;
