import React, { useEffect, useRef } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

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

import { storeReviews } from '@features/detailReview/detailReviewSlice';

import PurchaseModal from '@components/pages/ProductPage/_fragment/PurchaseModal';
import { RatingIcon } from '@icons/index';

import { SubmitButton } from '@shareComponents/index';
import { intComma } from '@utils/format';

import DetailSection1 from './_fragment/DetailSection1';
import DetailSection2 from './_fragment/DetailSection2';
import DetailSection3 from './_fragment/DetailSection3';
import { DetailType } from './data';

interface ProductDetailByIdPageProps extends ChakraProps {
  props: DetailType;
}

function ProductDetailByIdPage({
  props,
  ...basisProps
}: ProductDetailByIdPageProps) {
  const dispatch = useDispatch();
  const {
    id,
    name,
    description,
    price,
    capacity,
    detail,
    photo,
    reviewList,
    reviewCount,
  } = props;
  const { sum } = useSelector((state: RootStateOrAny) => state.detailReviews);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sectionOne = useRef(null);
  const sectionTwo = useRef(null);
  const sectionThree = useRef(null);
  const scrollToSection = (
    elementRef: React.MutableRefObject<HTMLButtonElement | null>,
  ) => {
    if (elementRef.current !== null) {
      const offset = elementRef.current.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (reviewList.length) dispatch(storeReviews(reviewList));
  }, []);

  return (
    <Box {...basisProps}>
      <Box boxSize="343px" h="300px" bgImage={photo}></Box>
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
            <Text variant="bold20">{name}</Text>
            <Text variant="normal20gray">{capacity}ml</Text>
          </HStack>
          <VStack spacing="-1" align="start" mb="10px">
            <HStack spacing="0">
              <Text variant="bold20commerse">{intComma(price)}</Text>
              <Text variant="normal20">???</Text>
            </HStack>
            <HStack fontWeight="bold" fontSize="12px" spacing="1">
              <Text>3?????? ?????? ?????????</Text>
              <Text color="commerse.500">????????????</Text>
            </HStack>
          </VStack>
          <Text mb="10px">{description}</Text>
          <HStack spacing="1">
            <RatingIcon />
            <Text variant="bold16">{sum}</Text>
            <Text variant="normal16gray">{`(${reviewCount}??? ??????)`}</Text>
          </HStack>
        </Box>
        <VStack mb="30px" onClick={onOpen}>
          <SubmitButton
            title="????????????"
            variant="btnwhite"
            size="btnlg"
            mb="0px"
          ></SubmitButton>
          <SubmitButton
            title="????????????"
            variant="btncommerse"
            size="btnlg"
          ></SubmitButton>
        </VStack>
      </Flex>
      <HStack w="100%" justify="space-evenly" pb="30">
        <Button variant="btntoggle" onClick={() => scrollToSection(sectionOne)}>
          ????????????
        </Button>
        <Button variant="btntoggle" onClick={() => scrollToSection(sectionTwo)}>
          ????????????
        </Button>
        <Button
          variant="btntoggle"
          onClick={() => scrollToSection(sectionThree)}
        >
          ?????? ({reviewCount})
        </Button>
      </HStack>
      <Box ref={sectionOne}>
        <DetailSection1 detail={detail} />
      </Box>
      <Box ref={sectionTwo}>
        <DetailSection2 />
      </Box>
      <Box ref={sectionThree}>
        <DetailSection3 />
      </Box>
      <PurchaseModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default ProductDetailByIdPage;
