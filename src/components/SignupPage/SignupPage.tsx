import React from 'react';

import ProfileFormPage from './_fragments/ProfileForm';
import SignupHeader from './_fragments/SignupHeader';

const SignupPage = () => {
  return (
    <>
      <SignupHeader />
      <ProfileFormPage signup={true} />
    </>
  );
};

export default SignupPage;
