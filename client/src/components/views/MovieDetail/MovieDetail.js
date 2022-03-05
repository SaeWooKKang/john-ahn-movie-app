import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

const MovieDetail = (props) => {
  // useParams로 parameters 가져옴 
  let {movieId} = useParams();

  const [Movie, setMovie] = useState(null);
  const [Casts, setCasts] = useState(null);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        setMovie(response);
      });
    
    fetch(endpointCrew)
    .then(response => response.json())
    .then(response => {
      setCasts(response.cast);
    });


  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
  <div>
    {/* Header */}
    {Movie &&  <MainImage 
       image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
       title={Movie.original_title}
       text={Movie.overview}/>
    }

    {/* Body */}
    <div style={{ width: '85%', margin: '1rem auto'}}>

      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
        {Movie && <Favorite  movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />}
      </div>

      {/* Movie Info */}
      {Movie && <MovieInfo movie={Movie} />}

      <br />
      {/* Actors Grid */}

    <div style={{ display:'flex', justifyContent:'center', margin:'2rem'}}></div>
        <button onClick={toggleActorView}> Toggle Actor View </button>
    </div>

    {ActorToggle && 
      <Row gutter={[16, 16]}>
          {Casts && Casts.map((cast, index) => (
            <React.Fragment key={index}>
              <GridCards 
                image={cast.profile_path 
                  ? `${IMAGE_BASE_URL}w500${cast.profile_path}` 
                  : null}
                characterName={cast.name}
              />
            </React.Fragment>
          ))}
      </Row>}
    
  </div>); 
};

export default MovieDetail;