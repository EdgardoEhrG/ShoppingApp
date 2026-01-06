'use client';

import { Grid, Stack, Typography } from '@mui/material';
import { getProductImg, getProductsById } from '../product-actions';
import Image from 'next/image';
import Checkout from '@/app/checkout/checkout';

interface ProductPageProps {
  params: { productId: string };
}

// eslint-disable-next-line @next/next/no-async-client-component
const ProductPage = async ({ params: { productId } }: ProductPageProps) => {
  const product = await getProductsById(Number(productId));

  return (
    <Grid container marginBottom={'2rem'} rowGap={3} size={{ md: 6, xs: 12 }}>
      <Grid>
        {product.isThereImg && (
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto sm:w-3/4 h-auto"
            src={getProductImg(Number(productId))}
            alt="product-img"
          />
        )}
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">{product.price}</Typography>
          <Checkout productId={Number(productId)} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
