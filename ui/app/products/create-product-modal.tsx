'use client';

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { FormError } from '../types';
import { createProduct } from './product-actions';
import { CloudUpload } from '@mui/icons-material';
import { CSSProperties } from '@mui/material/styles';

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

const fileInputStyles: CSSProperties = {
  width: 1,
  height: 1,
  position: 'absolute',
  bottom: 0,
  left: 0,
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
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
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onClose = () => {
    setResponse(undefined);
    handleClose();
  };

  const handleForm = async (formData: FormData) => {
    const response = await createProduct(formData, file ? file : undefined);
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
            <Button variant="outlined" startIcon={<CloudUpload />}>
              Upload file
              <input
                type="file"
                name="image"
                style={fileInputStyles}
                onChange={(e) => {
                  if (e.target.files) {
                    setFileName(e.target.files[0].name);
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
            <Typography>{fileName}</Typography>
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
