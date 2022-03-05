const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {

  // mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({"movieId": req.body.movieId})
    // 정보가 info에 들어옴
    .exec((err, info) => {
      if(err) return res.status(400).send(err)

      // 그 다음에 프론트에 다시 숫자 정보를 보내주기 
      res.status(200).json({success:true, favoriteNumber: info.length})
    })

});

router.post('/favorited', (req, res) => {
  
  // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DBd에서 가져오기

  // mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    // 정보가 info에 들어옴
    .exec((err, info) => {
      if(err) return res.status(400).send(err)

      let result = false;

      if(info.length !== 0) result = true;
      
      res.status(200).json({success:true, favorited: result})
    })

});

module.exports = router;