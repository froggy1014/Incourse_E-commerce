import React, { useEffect, useRef } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { SubmitButton } from '@components/common';

import DetailSection1 from './_fragment/DetailSection1';
import DetailSection2 from './_fragment/DetailSection2';
import DetailSection3 from './_fragment/DetailSection3';

import { RatingIcon } from 'generated/icons/RatingIcon';

interface ProductDetailByIdPageProps extends ChakraProps {
  id?: string | string[];
}

function ProductDetailByIdPage({
  id,
  ...basisProps
}: ProductDetailByIdPageProps) {
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const buttonProps = getButtonProps();

  return (
    <Box {...basisProps}>
      <Box boxSize="343px" h="300px" bgImage="/images/ProductDetail.png"></Box>
      <Flex
        direction="column"
        w="100%"
        h="100%"
        justify="space-between"
        roundedTop="20px"
        boxShadow="0px -10px 10px -8px #1A1A1A1A"
      >
        <Box w="50px" h="5px" rounded="2.5px" bg="gray.200" m="10px auto"></Box>
        <Box mx="15px" mb="15px">
          <HStack mt="20px" spacing="1">
            <Text variant="bold20">인코스런 로션</Text>
            <Text variant="normal20gray">120ml</Text>
          </HStack>
          <VStack spacing="-1" align="start" mb="10px">
            <HStack spacing="0">
              <Text variant="bold20commerse">27,000</Text>
              <Text variant="normal20">원</Text>
            </HStack>
            <HStack fontWeight="bold" fontSize="12px" spacing="1">
              <Text>3만원 이상 구매시</Text>
              <Text color="commerse.500">무료배송</Text>
            </HStack>
          </VStack>
          <Text mb="10px">
            순하고 마일드한 안심 처방으로 피부가 민감하고 연약한 우리 아이를
            위한 고보습 로션
          </Text>
          <HStack spacing="1">
            <RatingIcon />
            <Text variant="bold16">4.3</Text>
            <Text variant="normal16gray">(리뷰 125개)</Text>
          </HStack>
        </Box>
        <VStack mb="30px">
          <SubmitButton
            title="장바구니"
            variant="btnwhite"
            sizes="btnlg"
            mb="0px"
          ></SubmitButton>
          <SubmitButton
            title="바로구매"
            variant="btncommerse"
            sizes="btnlg"
          ></SubmitButton>
        </VStack>
      </Flex>
      <HStack w="100%" justify="space-evenly" pb="30">
        <Button {...buttonProps} variant="btntoggle">
          상세정보
        </Button>
        <Button {...buttonProps} variant="btntoggle">
          구매정보
        </Button>
        <Button {...buttonProps} variant="btntoggle">
          리뷰 (78)
        </Button>
      </HStack>
      <DetailSection1 />
      <DetailSection2 />
      <DetailSection3 />
    </Box>
  );
}

export default ProductDetailByIdPage;
