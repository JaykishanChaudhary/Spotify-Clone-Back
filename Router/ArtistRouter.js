const router=require('express').Router();
const Artist=require('../Controller/ArtistController');


router.post('/artist',Artist.createArtist);
router.get('/artist',Artist.GetArtist);



module.exports=router