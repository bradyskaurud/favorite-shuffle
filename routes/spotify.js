const express = require('express');
const Spotify = require('../components/spotify');
const router = express.Router();

router.get('/artists', async (req, res, next) => {
  const {
    query,
  } = req || {};

  const searchCriteria = query.search;

  const returnedArtists = await Spotify.getArtistsAlbums(searchCriteria);
});

module.exports = router;
