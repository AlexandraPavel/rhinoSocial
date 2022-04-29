const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const postRouter = require('./routers/post')
const commentRouter = require('./routers/comment')
const categoryRouter = require('./routers/category')

const app = express()
const port = process.env.PORT || 2234

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(postRouter)
app.use(commentRouter)
app.use(categoryRouter)
// app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})