const Config = {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    stagingRedirectUri: process.env.STAGING_REDIRECT_URI,
    stagingDatabaseUrl: process.env.STAGING_DATABASE_URL,
};

module.exports = Config;