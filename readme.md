# 오류, 새로 학습한 것 

``` javascript
<div style={{backgroundImage: `url('http://image.tmdb.org/t/p/w1280/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg')`}}>
dfsdfsdfdddddfsdf
</div>
```

## new 

#### React.Fragment
- Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있다.

#### 주석
- command + k + c

#### node 라우팅 

``` javascript
// index.js
app.use('/api/favorite', require('./routes/favorite'));

// ./routes/favorite
const router = express.Router();

router.post('/favoriteNumber', (req, res) => {

(...)

});

module.exports = router;
```

#### react-router-dom param 가져오는 법
``` javascript
// App.js
<Router>
  <Routes>
    <Route exact path="/movie/:movieId" element={<MovieDetail />} />
  </Routes>
</Router>

// MovieDetail
import { useParams } from 'react-router-dom';
const MovieDetail = (props) => {

  let {movieId} = useParams();

(...)
```