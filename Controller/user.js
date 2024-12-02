const User = require("../Database/Operation/user")

let user=new User()
const CreateUser=async (req,res)=>{
    const { name, email, phone, address, website,password } = req.body;
   const NewData= user.CreateData({name,email,phone,address,website,password})
   if(!NewData.res) return res.status(400).json({succed:false,message:"Data User is Not Created"})
    res.status(200).json({
        succed:true,
        message: 'User Created Successfully',
        data: { name, email, phone, address, website },
    });
}
const getAllUser=async (req,res)=>{
   const data= user.GetData()
    res.status(200).json(data)
}
module.exports={CreateUser,getAllUser}