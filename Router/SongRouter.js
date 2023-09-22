const router=require('express').Router();
// const Task=require('../controller/taskController');
const Song=require('../Controller/SongController');
const multer=require('multer')

const storage=multer.memoryStorage();
const upload=multer({storage});


router.post('/song',upload.single('coverImage'),Song.createSong);
router.get('/song',Song.GetSong);
// router.get('/task/filter',Task.FilterTasks);
// router.delete('/task/:_id',Task.deleteTask);
// router.put('/task/:_id',Task.UpdateTask);


module.exports=router