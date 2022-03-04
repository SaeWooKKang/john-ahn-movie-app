import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const Auth = (SpecificComponent, option, adminRoute = null) => {

  // null -> 아무나 출입이 가능한 페이지
  // true -> 로그인한 유저만 출입이 가능한 페이지
  // false -> 로그인한 유저는 출입 불가능한 페이지
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then(response => {
        // console.log(response);
        // client가 인증 받지 않았을 때  -> option == true 인곳에 접근할 때
        if (!response.payload.isAuth) option && navigate('/')
        // 인증은 받았으나 관리자 권한이 필요한 경우, 로그인 유저 출입 불가능 페이지 
        else {
          adminRoute && !response.payload.isAdmin
            ? navigate('/')
            : option === false && navigate('/'); 
        }
      })
    }, [dispatch, navigate]);

    return (
      <SpecificComponent />
    );
  };
  return AuthenticationCheck;
};

export default Auth;