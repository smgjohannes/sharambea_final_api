require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
      dateStrings: true,
    },
    logging: false,
    timezone: '+02:00',
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    retry: {
      match: [/SQLITE_BUSY/],
      name: 'query',
      max: 5,
    },
    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',

    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'migrations.json',

    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: 'migrations',

    // Use a different schema for the SequelizeMeta table
    migrationStorageTableSchema: 'custom_schema',

    // Use a different storage. Default: none
    seederStorage: 'json',
    // Use a different file name. Default: sequelize-data.json
    seederStoragePath: 'db-seeders.json',
    // Use a different table name. Default: SequelizeData
    seederStorageTableName: 'db-seeders',
  },

  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      dateStrings: true,
    },
    logging: false,
    timezone: '+02:00',
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    retry: {
      match: [/SQLITE_BUSY/],
      name: 'query',
      max: 5,
    },
  },

  production: {
    dialect: process.env.DATABASE_CLIENT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    logging: false,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    retry: {
      match: [/SQLITE_BUSY/],
      name: 'query',
      max: 5,
    },
  },
};
