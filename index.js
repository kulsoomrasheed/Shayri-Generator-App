require("dotenv").config()
const express= require('express')
const app = express()

const OpenAI= require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


async function main(word,res) {
 try{
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `You should act like a shayri generator and you have to generate a shayri for the word - "${word}".` },{ role: "user", content:word }],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
      const shayri= completion.choices[0]
res.send({shayri})
 }catch(e){
    res.send("Error: " + e.message)
    res.status(500).json({msg:"Error in generating shayri"})
 }
}


app.get("/",(req,res)=>{
    res.send("Welcome!")
})

app.get("/shayri/:word",async(req,res)=>{
try{
    const {word}= req.params
await main(word,res)
}catch(err){
    res.send(err.message)
}
})

app.listen(4000,()=>{
    console.log("Server listening on port 4000");
})
