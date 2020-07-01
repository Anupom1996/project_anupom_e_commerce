const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/E_Commerce',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>
{
    if(err)
    {
        console.log("Database is not Connected")
    }
    else{
        console.log("Database is Connected")
    }
})