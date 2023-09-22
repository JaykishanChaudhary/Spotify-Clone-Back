// const TaskModel=require('../model/task_schema');
const SongModel=require('../Model/SongSchema');
const ArtistModel=require('../Model/ArtistSchema');


exports.createSong=(async(req,res)=>{
    try{
        const {name,releaseDate,rating,artistNames}=req.body;

        if (!name || !releaseDate || !artistNames || !Array.isArray(artistNames)) {
            throw new Error('Missing required fields');
        }

        if (!req.file) {
            throw new Error('No file uploaded');
          }

        const artists = await ArtistModel.find({ name: { $in: artistNames } });
        const coverImageBuffer=req.file.buffer;
        const artistIds = artists.map(artist => artist._id);

        const Songnew=new SongModel({
            name:name,
            releaseDate:releaseDate,
            coverImage:coverImageBuffer,
            rating:rating,
            artistIds:artistIds
        })

        const SavedImage=await Songnew.save();
        res.status(200).json({
            status:'success',
            result:SavedImage
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'fail',
            result:err
        })
    }
})

exports.GetSong=(async(req,res)=>{
    try{
        const songs=await SongModel.find({}); 
        console.log(songs);
        res.status(200).json({
            status:'success',
            result:songs
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'fail',
            result:err
        })
    }

})


exports.FilterTasks = async (req, res) => {
    try {
        const filterField = req.query.field; 
        const filterValue = req.query.value; 
        console.log(req.query);
        if (!filterField ) {
            return res.status(400).json({
                status: 'fail',
                result: 'Both field and value are required for filtering.'
            });
        }else{
            if(filterValue){
                const filter = {};
                filter[filterField] = filterValue;
        
                const tasks = await TaskModel.find(filter);
                console.log('tasks',tasks);
                if (tasks.length > 0) {
                    res.status(200).json({
                        status: 'success',
                        result: tasks
                    });
                } else {
                    res.status(404).json({
                        status: 'fail',
                        result: 'No tasks found with the specified filter.'
                    });
                }
            }else{
                const tasks=await TaskModel.find({});
                if (tasks.length > 0) {
                    res.status(200).json({
                        status: 'success',
                        result: tasks
                    });
                } else {
                    res.status(404).json({
                        status: 'fail',
                        result: 'No tasks found with the specified filter.'
                    });
                }
            }
        }

       
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            result: err
        });
    }
};



exports.deleteTask=async(req,res)=>{
    try{
        const {_id}=req.params;
        const FindTask=await TaskModel.findOne({_id});
        console.log(_id,FindTask);
        if(FindTask){
            await TaskModel.deleteOne({_id});
            res.status(200).json({
                status:'success',
                result:'Successfully Deleted'
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                result:'this id does not exist'
            })
        }
    }catch(err){
        throw err
    }
}


exports.UpdateTask=async(req,res)=>{
    try{
        const {_id}=req.params;
        console.log(_id);
        const FindTask=await TaskModel.findOne({_id});

        if(FindTask){
            const UpdatedTask=await TaskModel.updateOne(FindTask,req.body);
            console.log(UpdatedTask);
            res.status(200).json({
                status:'success',
                result:UpdatedTask
            })
        }else{
            res.status(400).json({
                stsatus:'failed',
                result:'this id does not exist'
            })
        }

    }catch(err){
        throw err.message
    }
}