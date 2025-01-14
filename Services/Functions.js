const Glasses=require('../Mudoles/glasses')
//get
const ShowData=(req,res)=>{
    const see=Glasses.find()
    res.send(see)
}
//post
const NewData=()=>{
    const { Color, Price, IsFragile,Material,Volume} = req.body;
    
}