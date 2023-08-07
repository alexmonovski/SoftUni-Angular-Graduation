const mongoose = require('mongoose')
const { DB_STRING } = require('./env')

exports.initDb = () => {
    mongoose.set('strictQuery', true);
    mongoose.connection.on('open', () => console.log('Db is connected!'))
    // return mongoose.connect(`mongodb://localhost:27017/${DB_STRING}`)
    return mongoose.connect(`mongodb://127.0.0.1:27017/${DB_STRING}`)
}

