const ArtistModel=require('../Model/ArtistSchema');



exports.createArtist=(async(req,res)=>{
    try{
        const {name,DOB,Bio,Songs}=req.body;
        console.log(name,DOB,Bio,Songs);
        const NewArtist=new ArtistModel(req.body);
        const Artistnew=await NewArtist.save();
        res.status(200).json({
            status:'success',
            result:Artistnew
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'fail',
            result:err
        })
    }
})


exports.GetArtist=(async(req,res)=>{
    try{
        const artists=await ArtistModel.find({}); 
        console.log(artists);
        res.status(200).json({
            status:'success',
            result:artists
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'fail',
            result:err
        })
    }

})