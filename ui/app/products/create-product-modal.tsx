'use client';

import { Box, Button, Modal, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { FormError } from '../types';
import { createProduct } from './product-actions';

const styles = {
  width: 400,
  position: 'absolute',
  top: '50%',
  left: '50%',
  tranform: 'translate(-50%, -50%)',
  bgColor: 'background.paper',
  border: '2px solid #000',
  p: 4,
  boxShadow: 24,
};

interface CreateProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateProductModal = ({
  isOpen,
  handleClose,
}: CreateProductModalProps) => {
  const [response, setResponse] = useState<FormError>();

  const onClose = () => {
    setResponse(undefined);
    handleClose();
  };

  const handleForm = async (formData: FormData) => {
    const response = await createProduct(formData);
    if (response.data) {
      setResponse(response.data);
    } else {
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={styles}>
        <form action={handleForm} className="w-full max-w-sx">
          <Stack spacing={2}>
            <TextField
              name="name"
              type="name"
              variant="outlined"
              label="Name"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="description"
              type="description"
              variant="outlined"
              label="Description"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="price"
              type="price"
              variant="outlined"
              label="Description"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;
