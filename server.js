const PORT = process.env.PORT ||8000
const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')
const app=express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY;


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/generate',async (req,res)=>{
    const options = {
        method:'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages :[{role: 'user', content:"create a sql req to" +req.body.message}] ,
            max_tokens : 100,
        })

    }
    try {
        
        const response =await fetch('https://api.openai.com/v1/chat/completions',options)
        
         const data = await response.json()
         res.send(data.choices[0].message)
    } catch (error) {
        console.error(error)
    }
})

console.log('hi')
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})