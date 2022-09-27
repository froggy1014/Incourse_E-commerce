import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import { FloatingActionIcon } from '@icons/UI';

import ButtonCarousel from './ButtonCarousel';
import SingleCarousel from './SingleCarousel';

const Section3 = () => {
  return (
    <Box w="100%" zIndex="4" position="relative">
      <Text fontSize="26px" align="center" mt="80px">
        인코스런을 <strong>직접 사용해본</strong>
        <br />
        고객님의 솔직한 리뷰
      </Text>
      <ButtonCarousel />
      <SingleCarousel />
      <FloatingActionIcon />
    </Box>
  );
};
export default Section3;
