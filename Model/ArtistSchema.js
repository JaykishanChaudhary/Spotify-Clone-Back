const mongoose=require('mongoose');


const ArtistSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    DOB:{
        type:String,
    },
    Bio:{
        type:String,
    },
    Songs:[
        {type:String}
    ]
})


const ArtistModel=mongoose.model('Artists',ArtistSchema);

module.exports=ArtistModel


