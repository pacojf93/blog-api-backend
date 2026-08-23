const express = require('express')
const router = require('./routes/resourceRouter')
const postsRouter = require('./routes/postsRouter')
const usersRouter = require('./routes/usersRouter')
const commentsRouter = require('./routes/commentsRouter')
const tagsRouter = require('./routes/tagsRouter')
const cors = require('cors')

require('dotenv').config()
const { PORT } = process.env

const path = require('node:path')


const app = express()
app.use(cors())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true })) //parses form into js object in req.body

app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)
app.use('/tags', tagsRouter)
app.use('/', router)

app.listen(Number(PORT), () => {
    console.log(`Express server running on port: ${PORT}`)
})