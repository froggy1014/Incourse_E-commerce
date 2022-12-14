import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { RootStateOrAny, useSelector } from 'react-redux';

import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Img,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { CardPayIcon } from '@icons/index';

import { FormHelper, Loading, SubmitButton } from '@shareComponents/index';
import { addHyphenPhone, intComma } from '@utils/format';

import AddressModal from './_fragment/AddressModal';
import { FormDataType } from './_hooks/useFormValidate';
import { useGetme } from './_hooks/useQueries';

interface priceType {
  total: number;
  delivery: number;
  productId: number[];
  count: number[];
}
interface FormPageProps extends BoxProps {
  formData: UseFormReturn<FormDataType>;
  prices: priceType;
  setPrices: Dispatch<SetStateAction<priceType>>;
  products: any[];
  setProducts: Dispatch<SetStateAction<any[]>>;
}

const FormPageView = ({
  formData: {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  },
  onSubmit,
  prices,
  setPrices,
  products,
  setProducts,
  ...basisProps
}: FormPageProps) => {
  const checkBoxTrigger = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [btn, setBtn] = useState(true);
  const [copy, setCopy] = useState(true);
  const SearchTrigger = useRef<HTMLButtonElement>(null);
  const state = useSelector((state: RootStateOrAny) => state.CART);
  const { data } = useGetme();

  const changeHandler = () => {
    setCopy(!copy);
    const { username, phone, address, addressDetail } = getValues();
    setValue('orderUsername', copy ? username : '', { shouldValidate: true });
    setValue('orderPhone', copy ? phone : '', { shouldValidate: true });
    setValue('orderAddress', copy ? address : '', { shouldValidate: true });
    setValue('orderAddressDetail', copy ? addressDetail : '', {
      shouldValidate: true,
    });
  };
  useEffect(() => {
    if (data) {
      state.map((item: any) => {
        if (item.isChecked === true) {
          setPrices((prices) => ({
            total: prices.total + item.totalPrice,
            delivery: prices.delivery + item.deliveryFee,
            productId: [...prices.productId, item.productId],
            count: [...prices.count, item.count],
          }));
          const newProduct = { ...item.product, count: item.count };
          setProducts((products) => [...products, newProduct]);
        }
        setValue('username', data?.name);
        setValue('phone', addHyphenPhone(data.phone));
      });
    }
  }, [data]);

  if (!products) return <Loading />;
  return (
    <>
      <Box as="form" onSubmit={onSubmit} {...basisProps}>
        <Text variant="pageTitle">????????????</Text>
        <Stack divider={<Divider variant="fullthin" />}>
          <Text fontWeight="bold">?????? ??????</Text>
          <Stack>
            {products.map((product) => {
              console.log(product);
              return (
                <HStack w="100%" py="10px" key={product.id}>
                  <Img boxSize="60px" src="/images/ReviewImage.png" />
                  <Box fontSize="12px">
                    <Text fontWeight="bold">{product.name}</Text>
                    <Text textColor="gray.600">{`${product.name} | ${product.capacity}ml`}</Text>
                    <Text variant="boldcommerse" fontWeight="bold">
                      {`${product.price}??? ${product.count}???`}
                    </Text>
                  </Box>
                </HStack>
              );
            })}
          </Stack>
          {/* s: Form */}
          {/* s: ????????? ?????? */}
          <Box>
            <Text fontWeight="bold" mt="35px">
              ????????? ??????
            </Text>
            <FormHelper
              mt="2.5rem"
              mb="3.125rem"
              label="??????"
              errorText={errors.username?.message}
            >
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                autoComplete="off"
                placeholder="?????????"
                {...register('username')}
              />
            </FormHelper>
            <FormHelper
              mb="3.125rem"
              label="????????? ??????"
              errorText={errors.phone?.message}
            >
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('phone')}
                autoComplete="off"
                placeholder="010-1234-1234"
              />
            </FormHelper>
            <FormHelper
              mb="3.125rem"
              label="??????"
              errorText={errors.address?.message}
            >
              <Flex gap=".7rem" mb=".7rem">
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('address')}
                  autoComplete="off"
                  placeholder="??????"
                  onClick={() => {
                    if (
                      SearchTrigger !== null &&
                      SearchTrigger.current !== null
                    )
                      SearchTrigger.current.click();
                  }}
                />
                <Button
                  h="40px"
                  size="sm"
                  fontWeight="bold"
                  borderRadius="5px"
                  colorScheme="commerse"
                  type="button"
                  ref={SearchTrigger}
                  onClick={onOpen}
                >
                  ???????????? ??????
                </Button>
              </Flex>
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('addressDetail')}
                autoComplete="off"
                placeholder="?????? ??????"
              />
            </FormHelper>
          </Box>
          {/* e: ????????? ?????? */}

          {/* s: ????????? ?????? */}
          <Box>
            <HStack
              justify="space-between"
              align="center"
              textAlign="center"
              mt="35px"
            >
              <Text fontWeight="bold">????????? ??????</Text>
              <Checkbox
                colorScheme="commerse"
                color="gray.600"
                onChange={changeHandler}
              >
                ????????? ????????? ??????
              </Checkbox>
            </HStack>
            <FormHelper
              mt="2.5rem"
              mb="3.125rem"
              label="??????"
              errorText={errors.orderUsername?.message}
            >
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('orderUsername')}
                autoComplete="off"
                placeholder="?????????"
              />
            </FormHelper>
            <FormHelper
              mb="3.125rem"
              label="????????? ??????"
              errorText={errors.orderPhone?.message}
            >
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('orderPhone')}
                autoComplete="off"
                placeholder="010-1234-1234"
              />
            </FormHelper>
            <FormHelper
              mb="3.125rem"
              label="??????"
              errorText={errors.orderAddress?.message}
            >
              <Flex gap=".7rem" mb=".7rem">
                <Input
                  borderRadius="100px"
                  size="md"
                  borderColor="black"
                  {...register('orderAddress')}
                  autoComplete="off"
                  placeholder="??????"
                />
                <Button
                  h="40px"
                  size="sm"
                  fontWeight="bold"
                  borderRadius="5px"
                  colorScheme="commerse"
                  type="button"
                >
                  ???????????? ??????
                </Button>
              </Flex>
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('orderAddressDetail')}
                autoComplete="off"
                placeholder="?????? ??????"
              />
            </FormHelper>
            <FormHelper mb="3.125rem" label="??????????????????">
              <Input
                borderRadius="100px"
                size="md"
                borderColor="black"
                {...register('orderRequest')}
                autoComplete="off"
              />
            </FormHelper>
          </Box>
          {/* s: ????????? ?????? */}

          {/* s: ?????? ?????? */}
          <Text variant="bold16" mt="30px">
            ????????????
          </Text>
          <Flex>
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field: { onChange } }) => (
                <FormHelper my="20px" errorText={errors.paymentMethod?.message}>
                  <RadioGroup onChange={onChange} defaultValue="card">
                    <Radio value="card" colorScheme="commerse">
                      <Flex alignItems="center">
                        <Box mx="5px">
                          <CardPayIcon boxSize="50px" />
                        </Box>
                        <Text>???????????? ??????</Text>
                      </Flex>
                    </Radio>
                  </RadioGroup>
                </FormHelper>
              )}
            />
          </Flex>
          {/* e: ?????? ?????? */}

          {/* s: ?????? ?????? ?????? */}
          <Stack>
            <Text variant="bold16" my="30px">
              ?????? ????????????
            </Text>
            <Flex textColor="gray.600" mt="2.5rem">
              <Text>??? ????????????</Text>
              <Spacer />
              <Text>{intComma(prices.total)}???</Text>
            </Flex>
            <Flex textColor="gray.600" mt=".7rem" mb="1.3rem">
              <Text>??? ?????????</Text>
              <Spacer />
              <Text>{intComma(prices.delivery)}???</Text>
            </Flex>
          </Stack>
          <Flex my="1.3rem">
            <Text>????????????</Text>
            <Spacer />
            <Text variant="bold20commerse">
              {intComma(prices.total + prices.delivery)}???
            </Text>
          </Flex>
          <Box mt="10px">
            <Controller
              control={control}
              name="personalConsent"
              render={({ field: { onChange } }) => (
                <FormHelper errorText={errors.personalConsent?.message}>
                  <Flex>
                    <Checkbox
                      colorScheme="commerse"
                      size="lg"
                      mr="10px"
                      ref={checkBoxTrigger}
                      onChange={() => {
                        onChange();
                        setBtn(!btn);
                      }}
                    />
                    <Text
                      textColor="gray.600"
                      onClick={() => {
                        if (checkBoxTrigger.current !== null)
                          checkBoxTrigger.current.click();
                      }}
                    >
                      ???????????? ?????? ?????? ??????(??????)
                    </Text>
                  </Flex>
                </FormHelper>
              )}
            />
            {/* Submit Button */}
            <SubmitButton
              isDisabled={btn}
              title="????????????"
              size="btnlg"
              variant="btncommerse"
              mt="40px"
              mb="80px"
            />
          </Box>
        </Stack>
        {/* e: ?????? ?????? ?????? */}
        {/* <TestComponent /> */}
      </Box>
      <AddressModal isOpen={isOpen} onClose={onClose} setValue={setValue} />
    </>
  );
};

export default FormPageView;
