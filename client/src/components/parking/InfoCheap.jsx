import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

function InfoCheap({ size, icon, text, color }) {
  return (
    <Tag size={size} variant='subtle' colorScheme={color}>
      <TagLeftIcon boxSize={`${size}px`} as={icon} />
      <TagLabel>{text}</TagLabel>
    </Tag>
  );
}

export default InfoCheap;
