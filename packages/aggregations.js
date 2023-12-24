const mongoose = require("mongoose");

const SongAggregation = (category,name) =>{
    let categoryFilter,nameFilter;
    if(category !=""){
        categoryFilter ={
            $match: {
                "genre": {
                  $in: [mongoose.Types.ObjectId(category)]
                }
              }
        }
    }
    return [
    // {
    //     $match:{title:{'$regex': '.*'+query.name+'.*',$options:"i"}}
    // }
    // ,
    {
        $lookup: {
                from: "artists",
                  let: { products: "$artist"},
                  pipeline: [
                      { $match: { $expr: {$in: ["$_id", "$$products"] } } },
                      { $project: {_id: 0} } // suppress _id
                  ],
                 as: "artists_details"
               }
    },
    {
        $lookup: {
                from: "genres",
                  let: { products: "$genre"},
                  pipeline: [
                      { $match: { $expr: {$in: ["$_id", "$$products"] } } },
                      { $project: {_id: 0} } // suppress _id
                  ],
                 as: "genre_details"
               }
    },
    // categoryFilter \\
]};

// created_by
const AlbumCreatedBySongs = [
    {
        $lookup: {
            from: "songs",
              let: { products: "$songs"},
              pipeline: [
                  { $match: { $expr: {$in: ["$_id", "$$products"] } } },
                  { $project: {_id: 0} } // suppress _id
              ],
             as: "songs_details"
           }
    }
]

const AlbumCreatedByUser = [
    {
        $lookup: {
                from: "users",
                localField:"created_by",
                foreignField:"_id",
                as: "created_by_user"
        },
        
    },
    
    {
        $project: {
            
            "created_by_user._id": 0,
            "created_by_user.phone_code": 0,
            "created_by_user.profile_image": 0,
            
            "created_by_user.plan": 0,
            "created_by_user.resetPasswordToken": 0,
            "created_by_user.resetPasswordTokenVerified": 0,
            "created_by_user.token":0,
            
            "created_by_user.password": 0,
            "created_by_user.email": 0,
            "created_by_user.phone_number": 0,
            "created_by_user.createdAt": 0,
            "created_by_user.updatedAt": 0,
            "created_by_user.__v": 0
          }
    }

]



module.exports ={
    SongAggregation,
    AlbumCreatedByUser,
    AlbumCreatedBySongs
}