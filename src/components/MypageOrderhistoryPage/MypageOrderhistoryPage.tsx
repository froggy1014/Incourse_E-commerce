import React from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import { formatDateDash } from '@utils/format';

interface MypageOrderhistoryPageProps extends ChakraProps {}

const orderProducts = [
  {
    id: 0,
    order: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    product: {
      name: '샴푸 & 바디',
      price: 27000,
      image: '@images/orderHistory.png',
      volume: 300,
    },
    count: 1,
    shippingStatus: 'PAID',
    created: '2022-09-28T08:55:42.431Z',
  },
  {
    id: 0,
    order: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    product: {
      name: '로션',
      price: 20000,
      image: '@images/orderHistory.png',
      volume: 200,
    },
    count: 2,
    shippingStatus: 'AWAIT',
    created: '2022-09-28T08:55:42.431Z',
  },
  {
    id: 0,
    order: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    product: {
      name: '크림',
      price: 30000,
      image: '@images/orderHistory.png',
      volume: 100,
    },
    count: 5,
    shippingStatus: 'DONE',
    created: '2022-09-28T08:55:42.431Z',
  },
];

function MypageOrderhistoryPage({
  ...basisProps
}: MypageOrderhistoryPageProps) {
  return <Box {...basisProps}></Box>;
}

export default MypageOrderhistoryPage;
