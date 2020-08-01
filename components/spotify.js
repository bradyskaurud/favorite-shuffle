const SpotifyWebApi = require('spotify-web-api-node');

const Spotify = new SpotifyWebApi({
    clientId: 'c5b442b790954cd3ac576de0d5c6effe',
    clientSecret: 'f3ab048b90604abe8a6b6eecf2e34ae9',
    redirectUri: 'http://bskaurud.local.coschedule.ngrok.io/spotify/callback',
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