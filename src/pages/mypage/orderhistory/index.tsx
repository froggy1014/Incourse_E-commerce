import Head from 'next/head';

import MypageOrderhistoryPage from '@components/MypageOrderhistoryPage';

import MobileLayout from '@layout/MobileLayout';
import { Footer, MainHeader } from '@layout/components';

function MypageOrderhistory() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>주문내역</title>
      </Head>
      <MobileLayout
        header={<MainHeader />}
        content={<MypageOrderhistoryPage />}
        footer={<Footer />}
      />
    </>
  );
}

export default MypageOrderhistory;
