'use client';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateProductModal from './create-product-modal';
import { useState } from 'react';

const CreateProductFab = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <CreateProductModal
        isOpen={isModalVisible}
        handleClose={() => setIsModalVisible(false)}
      />
      <div className="absolute left-10 bottom-10">
        <Fab color="primary" onClick={() => setIsModalVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default CreateProductFab;
