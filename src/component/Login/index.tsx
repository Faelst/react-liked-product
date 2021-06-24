import axios from 'axios';
import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import { LoginKey, useLoginForm } from '../../model/login';
import { AuthService } from '../../service/auth';
import { GlobalStateContext } from '../../state';

import './index.css'

export const LoginForm: FC = () => {
  const { register, errors, handleSubmit } = useLoginForm();
  const { dispatch } = useContext(GlobalStateContext);
  const history = useHistory();

  const onSubmit = handleSubmit(data =>{
    console.log(data)
    axios.post('http://localhost:8080/login', data)
      .then(res => {

      })
    
    //return AuthService.login(data)
      // .then(user => dispatch({ type: 'LOGIN', payload: user }))
      // .then(() => history.push('/'))
      // .catch(() => alert('Username or Password Error'))
  }
  );

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
