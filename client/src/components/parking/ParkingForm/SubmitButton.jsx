import { Button } from '@chakra-ui/button';

const SubmitButton = ({ isSubmitting, onClick }) => {
  return (
    <Button
      mt={4}
      colorScheme='teal'
      isLoading={isSubmitting}
      type='submit'
      onClick={onClick}>
      Submit
    </Button>
  );
};

export default SubmitButton;
