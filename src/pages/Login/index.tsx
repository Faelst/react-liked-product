import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router';
import { LoginForm } from '../../component/Login';
import { useAuth } from '../../contexts/auth';
import { GlobalStateContext } from '../../state';
import './index.css';

export const LoginPage: FC = () => {
  const { signed } = useAuth();
  console.log(signed)
  return (
    <main className="login-page">
      <h1>Login</h1>

      <section className="login-form" style={{ width: 300 }}>
        {signed ? <Redirect to="/"></Redirect> : <LoginForm></LoginForm>}
      </section>
    </main>
  );
};
