const mongoose = require('mongoose')
const login = mongoose.model('login',{
    nama : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String
    }
})

module.exports = login




