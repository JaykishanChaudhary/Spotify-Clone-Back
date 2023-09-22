const { Binary } = require('mongodb');
const mongoose=require('mongoose');


const SongSchema=new mongoose.Schema({
        name:{
            type:String
        },
        releaseDate:{
            type:Date
        },
        coverImage:{
            type:Buffer
        },
        artistIds:[{
            type:String
        }],
        rating:{
            type:Number
        }
})


const SongModel=mongoose.model('SongCollection',SongSchema);

module.exports=SongModel


