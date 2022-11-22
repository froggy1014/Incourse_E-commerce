import React from 'react';

import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

import { IMyReviews } from '@components/MypageMyreviewsPage/MyReviews';
import { EmptyRatingIcon, RatingIcon } from '@icons/index';

import { formatDate } from '@utils/format';

const MyReviewCard = ({ review }: { review: IMyReviews }) => {
  const rateArr = Array(5).fill(0);
  return (
    <Box py="15px">
      <Box w="100%" fontSize="12px">
        <Flex w="100%" justify="space-between">
          <Text fontWeight="bold">{review.nickname}</Text>
          <HStack spacing="1">
            {rateArr.map((arr, i) => {
              if (i <= review.rate - 1) return <RatingIcon key={i} />;
              else return <EmptyRatingIcon key={i} />;
            })}
          </HStack>
        </Flex>
        <Text color="gray.600">{formatDate(review.created)}</Text>
      </Box>
      <Text mt="15px" mb="10px">
        {review.content}
      </Text>
      <HStack>
        {review.reviewimageSet?.map((url, i) => {
          return (
            <Image
              key={url.reviewId}
              src={url.url}
              boxSize="80px"
              alt="Image"
              objectFit="cover"
            />
          );
        })}
      </HStack>
    </Box>
  );
};

export default MyReviewCard;
