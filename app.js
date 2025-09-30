const express           = require('express')
const app               = express()
const expressLayouts    = require('express-ejs-layouts')
const port              = 3000
const {body, validationResult, check} = require('express-validator')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


require('./utils/db')
const login = require('./model/login')
const { Error } = require('mongoose')


// setup ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))


// setup flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge : 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())




app.get('/', (req,res) => {
    res.render('login', {title: 'Login', layout: 'layout/main-layout'} )
})

app.get('/login', (req,res) => {
    res.render('login', {title: 'Login', layout: 'layout/main-layout'} )
})

app.get('/berhasil', (req,res) => {
    res.render('berhasil', {title : 'berhasil' , layout : 'layout/main-layout'})
})

app.get('/register', (req,res) => {
    res.render('register', {title: 'register', layout : 'layout/main-layout'})
})


app.post('/register', async (req,res) => {
        try {
            await login.insertMany([req.body])
            req.flash('msg', 'data berhasil ditambhakan')
            res.redirect('/login')
            console.log(req.body)
        }catch(err){
            console.log(err)
        }
    }
)

app.post('/login',
    [body('nama').custom(async(value, {req}) => {
        const user = await login.findOne({nama : value})
    
        if(!user){
            throw new Error('username tidak sesuai')
        }
        if(!user.passwod){
            throw new Error('password tidak sesuai')
        }
        return true
    })], (req,res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty){
            req.flash('data tidak ada')
        }

        res.redirect('berhasil')

    }
)





app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})










