const Glasses=require('../Mudoles/glasses')
//get
const ShowData=async(req,res)=>{
    try{
    const see= await Glasses.find()
    res.send(see)
    console.log(see);
    }
    catch(error){
        res.status(500).send('Error getting student');
    }
}
//post
const NewData= async(req,res)=>{
    try{
    const { Color, Price, IsFragile,Material,Volume} = req.body;
    const newGlasses = Glasses({ Color, Price, IsFragile,Material,Volume});
    await newGlasses.save();
    res.json(newGlasses);
    console.log(newGlasses);
    }
    catch(error){
        res.status(500).send('Error adding student');
    }
}
//put
const UpdateData= async(req,res)=>{
    try{
    const { id } = req.params;
    const { Color, Price, IsFragile, Material, Volume} = req.body;
    const updatedGlasses = await Glasses.findByIdAndUpdate(id, { Color, Price, IsFragile, Material, Volume}, {new: true});
    if(!updatedGlasses){
        return res.status(404).send('Glasses not found');
    }
    res.json(updatedGlasses);
    console.log(updatedGlasses);
    }
    catch(error){
        res.status(500).send('Error updating student');
    }
}
//delete
const DeleteData= async(req,res)=>{
    try{
    const { id } = req.params;
    const deletedGlasses = await Glasses.findByIdAndDelete(id);
    if(!deletedGlasses){
        return res.status(404).send('Glasses not found');
    }
    res.json(deletedGlasses);
    console.log(deletedGlasses);
    }
    catch(error){
        res.status(500).send('Error deleting student');
    }
}

module.exports={
    ShowData
    ,NewData,
    UpdateData,
    DeleteData}