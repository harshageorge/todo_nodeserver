const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TodoDb",{useNewUrlParser:true,useUnifiedTopology:true})

const Todos = mongoose.model('Todos',{
    order: Number, 
    title: String
    
})//to create schema

module.exports={
    Todos
}