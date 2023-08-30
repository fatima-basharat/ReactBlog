const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error.message))

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
})

const Post = mongoose.model('Post', postSchema)

// get all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
})

// get one post
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.send(post)
})

// create new post
app.post('/post', async (req, res) => {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.send(savedPost)
})

// delete post
app.delete('/post/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id)
    res.status(200).send('Post deleted')
})

app.listen(5700, () => console.log('Server is running on port 5700'))