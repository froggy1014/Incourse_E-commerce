import React, { useState } from 'react';
import { useQueryClient } from 'react-query';

import {
  Box,
  Checkbox,
  CloseButton,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import { QtyMinusIcon, QtyPlusIcon } from '@components/common/@Icons/UI';

import { intComma } from '@utils/format';

import { useDeleteCart, useGetItemInfo } from '../_hook/useCartData';

interface CartItemType {
  cartItem: {
    cartId: number;
    count: number;
    id: number;
    productId: number;
  };
}

// interface CartCardProps extends ChakraProps {}
interface CartCardProps extends CartItemType {}

function CartCard({ cartItem }: CartCardProps) {
  const queryClient = useQueryClient();
  // const [product, setProduct] = useState<productType>();
  const [state, setState] = useState({
    count: 0,
    price: 0,
  });

  const onSuccess = () => {
    return queryClient.invalidateQueries(['CartList']);
  };

  const { mutate } = useDeleteCart(onSuccess);
  const { data: product, isLoading } = useGetItemInfo(cartItem.productId);
  const cartDelete = () => {
    console.log('delete');
    mutate(cartItem.id),
      {
        onSuccess,
      };
  };

  if (isLoading) return <h1>Loading</h1>;
  return (
    <HStack align="flex-start" justify="space-evenly">
      <Checkbox size="sm" colorScheme="commerse"></Checkbox>
      <Stack w="100%">
        <HStack>
          <Stack w="100%">
            <HStack justify="space-between" position="relative">
              <HStack>
                <Image
                  boxSize="60px"
                  src="/images/orderHistory.png"
                  bg="gray.100"
                  rounded="5px"
                />
                <Box>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text variant="normal12gray">
                    {product.name} | {product.capacity}ml
                  </Text>
                  <Text variant="boldcommerse">
                    {intComma(product.price)}원
                  </Text>
                </Box>
              </HStack>
              <CloseButton
                position="absolute"
                top="-5px"
                right="0"
                onClick={cartDelete}
              />
            </HStack>
          </Stack>
        </HStack>
        <Stack w="100%" h="80px" bg="gray.200" p="10px">
          <Text w="100%" text-align="left" variant="normal16gray">
            {product.name}
          </Text>
          <HStack w="100%" justify="space-between">
            <HStack rounded="5px" spacing="1px">
              <Box
                as="button"
                disabled={state.count === 1}
                onClick={() =>
                  setState((state) => {
                    return {
                      count: state.count - 1,
                      price: state.price - product.price,
                    };
                  })
                }
              >
                <QtyMinusIcon />
              </Box>
              <Text
                w="25px"
                h="25px"
                textAlign="center"
                bg="white"
                color="gray.800"
              >
                {cartItem.count}
              </Text>
              <Box
                onClick={() =>
                  setState((state) => {
                    return {
                      count: state.count + 1,
                      price: state.price + product.price,
                    };
                  })
                }
              >
                <QtyPlusIcon />
              </Box>
            </HStack>
            <Text variant="bold16gray" color="gray.600">
              {intComma(cartItem.count * product.price)}원
            </Text>
          </HStack>
        </Stack>
        <HStack w="100%" justify="space-between" py="10px">
          <Text>{state.price >= 30000 ? '배송비무료' : '배송비 2500원'}</Text>
          <Text variant="boldcommerse">
            {intComma(cartItem.count * product.price)}원
          </Text>
        </HStack>
      </Stack>
    </HStack>
  );
}

export default CartCard;
