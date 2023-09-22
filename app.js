const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT;
const mongoose=require('mongoose');
const SongRouter=require('./Router/SongRouter');
const ArtistRouter=require('./Router/ArtistRouter');

app.use(cors());
app.use(express.json());
app.use(SongRouter);
app.use(ArtistRouter);


mongoose.connect('mongodb+srv://jaykishanchaudhary678:3GYjW2yZr2aTmWvw@cluster0.1xz755a.mongodb.net/SongDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('connected to DB');
  })

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})