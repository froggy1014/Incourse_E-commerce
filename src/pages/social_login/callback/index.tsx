import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { setCookie } from 'cookies-next';

import { Flex, Spinner } from '@chakra-ui/react';

import MobileLayout from '@components/common/@Layout/MobileLayout';

import { axiosInstance, socialLoginReq } from '@utils/axios';

function SocialloginCallback({ code, state }: { code: string; state: string }) {
  const router = useRouter();
  const social = { code: code, state: state };
  useEffect(() => {
    socialLoginReq.post('/user/social_login/', social).then((response) => {
      setCookie('socialToken', response.data.socialToken);
      if (!response.data.isRegister) {
        router.push('/sign-up');
      } else {
        setCookie('access', response.data.access);
        setCookie('refresh', response.data.refresh);
        axiosInstance('user/me/')
          .then((res) => res.data)
          .then((data) => {
            axiosInstance.post(`cart/`, { userId: data.id }).then((res) => {
              setCookie('cartId', res.data.id);
              setCookie('userId', res.data.userId);
            });
          })
          .then(() => router.push('/'));
      }
    });
  });
  return (
    <>
      <Head>
        <title>callback</title>
      </Head>
      <MobileLayout
        content={
          <Flex w="100%" h="100vh" justify="center" align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="commerse.500"
              size="xl"
            />
          </Flex>
        }
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { code, state } = query;
  return {
    props: { code: code, state: state },
  };
};

export default SocialloginCallback;
