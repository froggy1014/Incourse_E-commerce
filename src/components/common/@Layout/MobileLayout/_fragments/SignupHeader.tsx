import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Logo } from '@icons/UI';

const SignupHeader = () => {
  return (
    <Flex w="100%" h="80px" justify="left" align="center" maxW="375px">
      <Logo size="sm" />
    </Flex>
  );
};

export default SignupHeader;
