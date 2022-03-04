import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate} from 'react-router-dom';
import Auth from '../../../hoc/auth';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Passowrd, setPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = event => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Passowrd
    };
    
    dispatch(loginUser(body)) // dispatch 와 reducer 함수 인자 연관성 찾아보기
      .then(response => response.payload.loginSuccess
          ? navigate('/') // 페이지 이동
          : alert('Fail to login')
      );
  };
  return (
    <div style={{
      display:'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>password</label>
        <input type="password" value={Passowrd} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Auth(LoginPage, false);