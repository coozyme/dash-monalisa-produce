const config = {
   "APP_STAGE": process.env.APP_STAGE,
   "API_KEY": process.env.API_KEY,

   "DATABASES": {
      "POSTGRES": {
         "DATABASE": process.env.DB_POSTGRES_NAME,
         "USERNAME": process.env.DB_POSTGRES_USERNAME,  //only for testing purposes you can also define the values here
         "PASSWORD": process.env.DB_POSTGRES_PASSWORD,
         "HOST": process.env.DB_POSTGRES_HOST,
         "PORT": process.env.DB_POSTGRES_PORT,
         "DIALECT": process.env.DB_POSTGRES_DIALECT //here you need 
         // "DATABASE": configure.databases.postgresql.database,
         // "USERNAME": configure.databases.postgresql.username,
         // "PASSWORD": configure.databases.postgresql.password,
         // "HOST": configure.databases.postgresql.host,
         // "DIALECT": configure.databases.postgresql.dialect,
         // "POOL": configure.databases.postgresql.pool
      }
   },
   // "DB_POSTGRES_USERNAME": configure.databases.postgresql.username,
   // "DB_POSTGRES_PASSWORD": configure.databases.postgresql.password,
   // "DB_POSTGRES_NAME": configure.databases.postgresql.database,
   // "DB_POSTGRES_HOST": configure.databases.postgresql.host,
   // "DB_POSTGRES_DIALECT": configure.databases.postgresql.dialect,
   // "DB_POSTGRES_POOL": configure.databases.postgresql.pool

}
module.exports = config