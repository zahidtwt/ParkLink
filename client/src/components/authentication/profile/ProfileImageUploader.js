import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ProfileImageUploader = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'gsmrcgns');
    setUploading(true);

    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/di31yslny/image/upload',
        formData
      );

      setUploading(false);
      onUploadSuccess(data.secure_url);

      toast({
        title: 'Image uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setUploading(false);

      toast({
        title: 'Error uploading image',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack>
      <FormControl>
        <FormLabel>Edit profile picture</FormLabel>
        <Input type='file' onChange={handleFileChange} />
      </FormControl>
      <Button
        isLoading={uploading}
        loadingText='Uploading'
        onClick={handleUpload}>
        Upload
      </Button>
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt='Profile preview'
          width='150'
        />
      )}
    </VStack>
  );
};

export default ProfileImageUploader;
