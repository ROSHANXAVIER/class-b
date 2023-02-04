/////////////////////////////////////////////

//SAJI
const express=require("express");
const cors=require('cors');
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({origin: true, credentials: true}))
//////////////////////////////////////////////


//DONEY
const mongoose=require("mongoose");
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://localhost:27017/final",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection successful')

}).catch((error)=>{
    console.log('some error',error)
})
const newSchema=new mongoose.Schema({
    name:String,
    age:Number,
    title:String,
},{collection:'final_class'});
const mongos = mongoose.model("final_class_model", newSchema);
////////////////////////////////////////////


///////////////////////////////////////////
app.get('/get_name',async(req,res)=>{
    const result=await(mongos.findOne({project:"mongo_db"}));
    res.send(result.title);
})

app.post('/post_name',async(req,res)=>{
    let person=(req.body.name);
    let result=await(mongos.findOne({name:person}));
    let age_of_person=String(result.age);
    res.send(age_of_person);
})
//////////////////////////////////////////////


/////////////////////////////////////////////
////SAJI
app.listen(3000, function(){
    console.log("App is running on Port 3000");
});
///////////////////////////////////////////