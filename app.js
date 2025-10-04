const express           = require('express')
const app               = express()
const expressLayouts    = require('express-ejs-layouts')
const port              = 3000
const {body, validationResult, check} = require('express-validator')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt             = require('bcrypt')


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



function authMiddleware(req,res, next) {
    if(!req.session.user){
        return res.redirect('/login')
    }
    next()
}



app.get('/', (req,res) => {
    res.render('main', {title: 'Login', layout: 'layout/main-layout'} )
})

app.get('/login', (req,res) => {
    res.render('login', {title: 'Login', layout: 'layout/main-layout'} )
})


app.get('/register', (req,res) => {
    res.render('register', {title: 'register', layout : 'layout/main-layout'})
})


app.post('/register', async (req,res) => {
        try {
            const hash = await bcrypt.hash(req.body.password, 10)
            const newUser = {
                nama : req.body.nama,
                password : hash,
                role : 'user'
            }
            await login.insertMany([newUser])
            req.flash('msg', 'data berhasil ditambhakan')
            res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }
)


app.post('/login',
    [body('nama').custom(async(value, {req}) => {
        const user = await login.findOne({nama : value})
        if(!user){
            throw new Error('nama tidak ada')
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            throw new Error('password tidak sesuai')
        }
        req.session.user = {
            nama: user.nama
        }
 
    })],

    (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('data tidak ada')
            res.redirect('login')
            console.log(errors.array())
        } else {
            res.redirect(`/login/${req.body.nama}`)
        }
    }
)



app.get('/login/:nama', authMiddleware,async (req,res) => {
    const data = await login.findOne({nama : req.params.nama})


    if(!req.session.user && !data && req.session.user !== req.params.nama){
        return res.redirect('/login')
    } 
    res.render('berhasil', {title : 'berhasil' , layout : 'layout/main-layout'})
    
})




app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})







