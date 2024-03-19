const express=require('express')
const app=express()

require('./database/connection')

require('./passport')

const Local=require('./database/model')
app.use(express.urlencoded({extended:true}))


const cors=require('cors')


const { hashSync, compareSync } = require('bcrypt')
const passport = require('passport')

const jwt=require('jsonwebtoken')
app.use(express.json())
app.use(cors())


  app.use(passport.initialize())
 
  

app.post('/register',(req,res)=>{
    
       const user=new Local({
        name:req.body.name,
        password:hashSync(req.body.password,10) 
       })
       user.save().then((user)=>{
        console.log(user)
        res.send('success')
       })
       
   
   
})

app.post('/login', 
  (req,res)=>{
    Local.findOne({name:req.body.name}).then((user)=>{
      if(!user){
        return res.send('user not found')
      }
      if(!compareSync(req.body.password,user.password)){
        return res.send('password incorrect')
      }
      payload={
        name:user.name,
        id:user._id
      }
      const token=jwt.sign(payload, 'sabarinathan', {expiresIn:'1d'})
      return res.status(200).send('bearer '+ token)

    })
  }
  );


  app.get('/protected', passport.authenticate('jwt', { session: false }),
  function(req, res) {
      res.send(req.user);
  }
);

app.get('/logout',(req,res)=>{
req.logout(()=>res.redirect('http://localhost:3000/login'))


})









app.listen(80,()=>{
    console.log('server at 80')
})