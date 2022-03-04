import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  const onPasswordConfirmHandler = e => {
    setPasswordConfirm(e.currentTarget.value);
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    if(Password !== PasswordConfirm) return alert('비밀번호가 다릅니다.');

    const body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body))
      .then(response => response.payload.success
        ? navigate('/login') // 페이지 이동
        : alert('Fail to sign up')
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>PasswordConfirm</label>
        <input type="password" value={PasswordConfirm} onChange={onPasswordConfirmHandler} />

        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Auth(RegisterPage, false);

