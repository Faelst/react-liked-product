import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { LoginKey, useLoginForm } from '../../model/login';
import { useAuth } from '../../contexts/auth'

import './index.css'

export const LoginForm: FC = () => {
  const { register, errors, handleSubmit } = useLoginForm();
  const { signed, Login } = useAuth();
  

  const onSubmit = handleSubmit(async data =>{
    Login(data)
  });

  return (
    <form className="login-form form" onSubmit={onSubmit}>
      <div className="form__control">
        <label>
          <span>Usuario:</span>
          <input type="text" name={LoginKey.username} ref={register} />
        </label>
        {errors.username && <p className="form__error">{'Informe o usuario corretamente'}</p>}
      </div>

      <div className="form__control">
        <label>
          <span>Senha:</span>
          <input type="password" name={LoginKey.password} ref={register} />
        </label>
        {errors.password && <p className="form__error">{'Informe a senha corretamente'}</p>}
      </div>

      <div className="form__control">
        <button className="btn-login" type="submit">Entrar</button>
      </div>
    </form>
  );
};
