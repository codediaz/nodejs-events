
require('dotenv').config()

const fs = require('fs')

const ormconfig = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        "src/entity/*.js"
    ],
    logging: false,
    synchronize: true
}

fs.writeFileSync('ormconfig.json', JSON.stringify(ormconfig,null,2));