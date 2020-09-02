const SpotifyWebApi = require('spotify-web-api-node');
const Config = require('../config/index.js');

const Spotify = new SpotifyWebApi({
    clientId: Config.spotifyClientId,
    clientSecret: Config.spotifyClientSecret,
    redirectUri: Config.stagingRedirectUri,
});

const scopes = ['playlist-read-private', 'playlist-modify-public', 'user-read-playback-state', 'user-read-private', 'user-read-email'];

function normalizeArtists(artists) { 
    return artists.map((artist) => {
        const {
            id, 
            name,
            images
        } = artist;

        return {
            id,
            name,
            image: images && images[0],
        };
    });     
}

Spotify.getArtistsAlbums = async (query) => {
    const response = await Spotify.search(query, ['artist']);
    const { artists } = (response && response.body) || {};

    const normalizedArtists = this.normalizeArtists(artists.items);
};

Spotify.getAuthorizeUrl = () => {
    return Spotify.createAuthorizeURL(scopes);
};

module.exports = Spotify;