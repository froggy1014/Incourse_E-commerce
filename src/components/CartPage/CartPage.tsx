import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { cloneDeep } from 'lodash';

import {
  Box,
  ChakraProps,
  Checkbox,
  Divider,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';

import {
  allTogglePaymentState,
  clearPaymentState,
  togglePaymentState,
} from '@features/payment/paymentSlice';

import { Loading, SubmitButton } from '@components/common';

import { ROUTES } from '@constants/routes';
import { intComma } from '@utils/format';

import CartCard from './_fragment/CartCard';
import EmptyCart from './_fragment/EmptyCart';
import { useGetCart } from './_hook/useCartData';

interface CartPageProps extends ChakraProps {}

interface CartType {
  cartId: number;
  count: number;
  id: number;
  productId: number;
}
function CartPage({ ...basisProps }: CartPageProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const index: number[] = [];
  const [delivery, setDelivery] = useState<number>(0);
  const [total, setTotal] = useState<number>();

  const { count, totalPrice, deliveryFee, isChecked } = useSelector(
    (state: RootStateOrAny) => state.PAYMENT,
  );

  const { isLoading, data: cart } = useGetCart();

  // 장바구니 아이템만큼의 Array를 만들어서 check 배열로 사용
  const [checkedItems, setCheckedItems] = useState(
    Array(cart !== undefined ? cart.length : 0).fill(false),
  );
  // allChecked 버튼으로 일괄적 토글을 위한 변수
  const allChecked = checkedItems.every((b) => b === true);
  // 하나라도 체크가 되어있다면 표시 되게끔 체크박스 아이콘이 바뀜
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // 체크박스 이벤트
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cartItem: any,
  ) => {
    // 토글하게되면 해당되는 장바구니 아이템의 아이디를 넘겨서 isChecked를 true로 만들어줌
    dispatch(togglePaymentState(cartItem.id));

    // 해당 인덱스에 해당되는 check배열을 toggle해줌
    const newArr = checkedItems.map((v, idx) =>
      idx === Number(e.target.value) ? !v : v,
    );
    setCheckedItems(newArr);
  };

  // 처음들어왔을때, redux에 isChecked를 다 false로 초기화 시켜줌
  useEffect(() => {
    dispatch(clearPaymentState());
  }, []);

  // 체크박스가 toggle되거나 count가 바뀌면 총 상품, 배송비 업데이트해줌
  useEffect(() => {
    isChecked.map((v: boolean, i: number) => {
      if (v === true) {
        index.push(i);
      } else if (v === false) {
        if (index.indexOf(i) !== -1) index.filter((v) => v !== i);
      }
    });
    let price = 0;
    let delivery = 0;
    for (const t of index) {
      price += totalPrice[t];
      delivery += deliveryFee[t];
    }
    setTotal(price);
    setDelivery(delivery);
  }, [isChecked, count]);

  if (isLoading) return <Loading />;
  if (cart.length === 0) return <EmptyCart />;

  return (
    <Box {...basisProps}>
      <Stack divider={<Divider bg="gray.200" h="10px" />}>
        <HStack color="gray.600" justify="space-between">
          <Checkbox
            colorScheme="commerse"
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={() => {
              if (checkedItems.every((b) => b === true)) {
                setCheckedItems(cloneDeep(checkedItems.fill(false)));
                dispatch(clearPaymentState());
              } else {
                setCheckedItems(cloneDeep(checkedItems.fill(true)));
                dispatch(allTogglePaymentState());
              }
            }}
          >
            모두선택
          </Checkbox>
          <Text>선택삭제</Text>
        </HStack>
        {cart.map((cartItem: CartType, i: number) => {
          return (
            <HStack key={cartItem.id} align="start">
              <Checkbox
                value={i}
                isChecked={checkedItems[i]}
                colorScheme="commerse"
                onChange={(e) => handleChange(e, cartItem)}
              ></Checkbox>
              <CartCard cartItem={cartItem} />
            </HStack>
          );
        })}
        <Stack h="auto" spacing="4" pb="70px">
          <HStack color="gray.600" justify="space-between">
            <Text>총 상품금액</Text>
            <Text>{total && intComma(total)}원</Text>
          </HStack>
          <HStack color="gray.600" justify="space-between">
            <Text>총 배송비</Text>
            <Text>{intComma(delivery)}원</Text>
          </HStack>
          <Divider />
          <HStack justify="space-between">
            <Text>결제금액</Text>
            <Text variant="boldcommerse">
              {intComma(Number(total) + Number(delivery))}원
            </Text>
          </HStack>
          <SubmitButton
            title="결제하기"
            size="btnlg"
            variant="btncommerse"
            onClick={() => router.push(ROUTES.PURCHASE.MAIN)}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default CartPage;
