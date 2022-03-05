import Axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Favorite(props) {

  const {movieId, userFrom} = props;
  const {title:movieTitle, backdrop_path:moviePost, runtime:movieRunTime} = props.movieInfo;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    
    let variables = {userFrom, movieId};

    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('숫자 정보를 가져오는데 실패 했습니다.');
        }
      });
    
    Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert('정보를 가져오는데 실패 했습니다.');
        }
      });

  }, []);
  return (
    <div>
      <button>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</button>
    </div>
  )
}
