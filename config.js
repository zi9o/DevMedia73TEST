module.exports = {
	  // App Settings
  database: process.env.MONGO_URI || 'mongodb://localhost/devmedia_db',
  port: process.env.PORT || 3000,
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET'
}
