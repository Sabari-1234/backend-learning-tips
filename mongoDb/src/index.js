require('./DB/database')

const Blog=require('./DB/models/blog')

const express=require('express')
const app=express()
app.use(express.json())



app.post('/blogs',async (req,res)=>{
    // const blog=new Blog(req.body)
    // blog.save().then(blog=>{
    //     res.status(200).send(blog)
    // }).catch(err=>{
    //     res.status(404).send(err)
    // })

    
    
    //Blog.create(req.body).then(blog=>res.status(200).send(blog)).catch(err=>res.status(404).send(err))


   // Blog.insertMany(req.body).then(blogs=>res.status(200).send(blogs)).catch(err=>res.status(404).send(err))


   //async await

    try {
        const blog=await Blog.create(req.body)
        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send(error)
    }
})


app.get('/blogs',(req,res)=>{
    Blog.find({}).then(blog=>res.status(200).send(blog)).catch(err=>res.status(400).send(err))
})


app.get('/blogs/:id',(req,res)=>{
    // Blog.findById(req.params.id).then(blog=>
    //     {
    //         if(!blog){
    //             return res.status(400).send()
    //         }
    //         res.status(200).send(blog)
    //     }).catch(err=>res.status(400).send(err))



    Blog.findOne({_id:req.params.id})
    .then(blog=>
            {
                if(!blog){
                    return res.status(400).send()
                }
                res.status(200).send(blog)
            }).catch(err=>res.status(400).send(err))
})


app.patch('/blogs/:id',(req,res)=>{
    // Blog.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(blog=>{
    //     if(!blog){
    //         return res.status(400).send()
    //     }
    //     res.status(200).send(blog)
    // }).catch(err=>res.status(400).send(err))


    Blog.updateOne({_id:req.params.id},req.body).then(blog=>res.status(200).send(blog)).catch(err=>res.status(404).send(err))


    //Blog.findOneAndUpdate({_id:req.params.id},req.body).then(blog=>res.status(200).send(blog)).catch(err=>res.status(404).send(err))


    //Blog.findOneAndReplace({_id:req.params.id},req.body).then(blog=>res.status(200).send(blog)).catch(err=>res.status(404).send(err))



   // Blog.replaceOne({_id:req.params.id},req.body).then(blog=>res.status(200).send(blog)).catch(err=>res.status(404).send(err))


   // Blog.updateMany({title:req.params.id},req.body).then(blog=>res.status(200).send(blog)).catch(err=>res.status(404).send(err))
})


app.delete('/blogs/:id',(req,res)=>{
    // Blog.findByIdAndDelete(req.params.id).then(blog=>{
    //     if(!blog){
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(blog)
    // }).catch(err=>res.status(404).send(err))

    // Blog.findByIdAndRemove(req.params.id).then(blog=>{
    //     if(!blog){
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(blog)
    // }).catch(err=>res.status(404).send(err))

    // Blog.findOneAndDelete({_id:req.params.id}).then(blog=>{
    //     if(!blog){
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(blog)
    // }).catch(err=>res.status(404).send(err))



    Blog.findOneAndRemove({_id:req.params.id}).then(blog=>{
        if(!blog){
            return res.status(404).send()
        }
        res.status(200).send(blog)
    }).catch(err=>res.status(404).send(err))
})




app.listen(80,()=>{
    console.log('server at 80')
})