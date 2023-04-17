import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

function ImageUpload({ uploadedImages, handleImageUpload, handleImageRemove }) {
  const [, setUploadProgress] = useState(0);
  const toast = useToast();
  const [numImages, setNumImages] = useState(uploadedImages.length);

  const onDrop = async (acceptedFiles) => {
    try {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('file', file);
      });
      formData.append('upload_preset', 'gsmrcgns');
      formData.append('cloud_name', 'di31yslny');

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/di31yslny/image/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          },
        }
      );
      await handleImageUpload(`${res.data.secure_url}`);
      setNumImages(numImages + 1);
      toast({
        title: 'Upload successful',
        description: `${acceptedFiles.length} image${
          acceptedFiles.length === 1 ? '' : 's'
        } uploaded.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top',
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Upload failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top',
      });
    }
  };
  const handleRemoveImage = (imageUrl) => {
    handleImageRemove(imageUrl);
    setNumImages(numImages - 1);

    toast({
      title: 'Image removed',
      description: 'The image has been successfully removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      variant: 'left-accent',
      position: 'top',
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FormControl>
      <FormLabel>Upload Images</FormLabel>
      <Flex
        {...getRootProps()}
        border='1px dashed'
        borderColor='gray.200'
        borderRadius='lg'
        p={4}
        alignItems='center'
        justifyContent='center'
        minH='150px'
        cursor='pointer'
        transition='all 0.3s ease-in-out'
        _hover={{ bg: 'gray.50' }}>
        <input {...getInputProps({ name: 'file' })} />

        {isDragActive ? (
          <Text fontSize='sm'>Drop the files here ...</Text>
        ) : (
          <>
            <FiUpload size='24px' />
            <Text ml={2} fontSize='sm'>
              Drag and drop or click to upload
            </Text>
          </>
        )}
      </Flex>
      {uploadedImages?.length > 0 && (
        <>
          <Text fontSize='sm' mt={4}>
            Uploaded Images:
          </Text>
          <Flex flexWrap='wrap' mt={2}>
            {uploadedImages.map((imageUrl) => (
              <Box
                key={imageUrl}
                bg='gray.50'
                borderRadius='lg'
                p={2}
                m={2}
                boxShadow='lg'
                position='relative'>
                <Image
                  src={imageUrl}
                  alt='Uploaded image'
                  maxH='100px'
                  maxW='100px'
                  objectFit='cover'
                />
                <Box
                  position='absolute'
                  top='2'
                  right='2'
                  cursor='pointer'
                  onClick={() => {
                    handleRemoveImage(imageUrl);
                  }}>
                  <AiOutlineClose size='20px' />
                </Box>
              </Box>
            ))}
          </Flex>
        </>
      )}
    </FormControl>
  );
}

export default ImageUpload;
