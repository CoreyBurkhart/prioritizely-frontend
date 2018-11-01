import React from 'react';
import { Helmet } from 'react-helmet';
import SigninSignoutButton from '@/components/SigninSignoutButton/SigninSignoutButtonContainer';

function AccountView() {
  return (
    <div className="view">
      <Helmet>
        <title>Account</title>
      </Helmet>
      <SigninSignoutButton />
    </div>
  );
}

export default AccountView;
