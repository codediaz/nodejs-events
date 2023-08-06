
require('dotenv').config()

const fs = require('fs')

const ormconfig = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    logging: false,
    entities: [
        "src/entity/*.js"
    ],
    cli: {
        "entitiesDir": "src/entity"
    },
    synchronize: true
}

fs.writeFileSync('ormconfig.json', JSON.stringify(ormconfig,null,2));