import React from 'react';

import { Box, ChakraProps, Flex, Heading, Text } from '@chakra-ui/react';

import { SubmitButton } from '@components/common/index';
import { ClapIcon } from '@icons/UI';

interface SignUpSuccessPageProps extends ChakraProps {}

function SignUpSuccessPage({ ...basisProps }: SignUpSuccessPageProps) {
  const handleSubit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('로긴 성공');
  };

  return (
    <>
      <Flex
        as="form"
        direction="column"
        align="center"
        h="100vh"
        justify="space-evenly"
        onSubmit={handleSubit}
      >
        <Box w="100%">
          <Heading fontSize="26px">회원가입이</Heading>
          <Heading fontSize="26px">완료되었습니다.</Heading>
          <Text fontSize="14px" color="gray.600">
            관심사별로 자유롭게 소통해보세요!
          </Text>
        </Box>
        <ClapIcon w="216px" h="216px" fill="white" mt="100px" />
        <SubmitButton
          title="시작하기"
          variant="btncommerse"
          sizes="btnlg"
          mb="0"
        />
      </Flex>
    </>
  );
}

export default SignUpSuccessPage;
