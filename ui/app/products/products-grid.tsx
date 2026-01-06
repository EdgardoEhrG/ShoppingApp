'use client';

import { Grid } from '@mui/material';
import type { IProduct } from '../types';
import Product from './product';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import API_URL from '../constants/api';
import checkAuthentication from '../auth/checkAuthentication';

interface ProductsGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: checkAuthentication(false),
        },
      });

      socket.on('ProductUpdated', () => {
        //
      });
    };

    createSocket();
    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <Grid
      container
      spacing={3}
      sx={{ height: '85vh', overflow: 'scroll' }}
      size={{ sm: 6, lg: 4, xs: 12 }}
    >
      {products.map((product) => {
        return (
          <Grid key={product.id}>
            <Product product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
