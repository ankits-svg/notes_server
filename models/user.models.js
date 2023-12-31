const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    age:Number,
    location:String
},{
    timestamps: true,
    versionKey:false
})

const UserModel=mongoose.model('user',userSchema)

module.exports={
    UserModel
}