import React from 'react';
import { useQueries } from 'react-query';

import { Box, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react';

import { getProductDetail } from '@apis/_axios/axiosGet';

import { Loading } from '@components/common';

import { shippingStatus } from '@utils/validate';

import { IItem } from '../OrderHistory';
import ItemCard from './ItemCard';

const HistoryCard = ({ items, status }: { items: IItem[]; status: string }) => {
  const data = useQueries(
    items.map((uuidItem) => {
      return {
        queryKey: ['product', uuidItem?.productId],
        queryFn: async () => await getProductDetail(uuidItem?.productId),
      };
    }),
  );
  if (data[items.length - 1].isLoading) return <Loading />;

  return (
    <Stack mb="10px" divider={<Divider variant="fullthin" />}>
      {data?.map((item, i) => {
        return (
          <HStack w="100" justify="space-between" key={i}>
            <ItemCard item={item.data} count={items[i]?.count} />
            <Stack align="end" spacing="0" fontSize="12px">
              <Text variant="boldcommerse">{shippingStatus(status)}</Text>
              <Text>
                {item.data?.price * items[i]?.count >= 30000
                  ? '무료배송'
                  : '배송비 2,500원'}
              </Text>
            </Stack>
          </HStack>
        );
      })}
    </Stack>
  );
};

export default HistoryCard;
