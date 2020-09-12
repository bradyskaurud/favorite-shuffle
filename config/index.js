const Config = {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    stagingRedirectUri: process.env.STAGING_REDIRECT_URI,
    stagingDatabaseUrl: process.env.STAGING_DATABASE_URL,
    configureDb: (db) => {
        initializeDbConnection(db);
        syncDb(db);
    },
};

async function initializeDbConnection(db) {
    try {
      return await db.sequelize.authenticate()
    } catch (error) {
      console.log(error);
    }
}
  
async function syncDb(db) {
    try {
        return db.sequelize.sync();
    } catch (error) {
        console.log(error);
    }
}
  
module.exports = Config;