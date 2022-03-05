// LandingPage에 만들 수 있지만 Grid같은 경우엔 여러곳에서 사용할 수 있기에..

import React from 'react'
import {Col} from 'antd';

const GridCards = props => {

  if (props.LandingPage) {
    return (
      // 한 칼럼이 24 사이즈, 즉 제일 큰 화면에선 칼럼 4개
      <Col lg={6} md={8} xs={24}>
        <div style={{position: 'relative'}}>
          <a href={`/movie/${props.movieId}`}>
            <img style={{ width:'100%', height:'320px'}} src={props.image} alt={props.movieName}/>
          </a>
        </div>
      </Col>
      
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{position: 'relative'}}>
            <img style={{ width:'100%', height:'320px'}} src={props.image} alt={props.characterName}/>
        </div>
      </Col>
    );
  }
 
}

export default GridCards;
