const express=require('express')
const app=express()
const multer=require('multer')
require('./Database/connect')
const Image=require('./Database/model/imageModel')
// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/image',upload.single('image'),(req,res)=>{
    Image.create({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    }).then(image=>res.status(200).send(image)).catch(err=>res.status(404).send(err))

})

app.get('/image/:id',(req,res)=>{
    Image.findById(req.params.id).then(image=>{
       res.contentType(image.contentType)
        res.send(image.data)}).catch(err=>{
        res.send(err)
    })
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/image.html')
})
app.listen(80,()=>{
    console.log('server is running')
})