const meets= require('express').Router()
const db= require('../models')
const{meet}=db

meetgreet.get('/', async (req, res) => {
    try {
        const foundmeets = await meet.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundmeets)
    } catch (error) {
        res.status(500).json(error)
    }
})



meetgreet.get('/:id',async(req,res)=>{
    try{
        const foundmeet=await meet.findOne({
            where:{band_id:req.params.id}
        })
        res.status(200).json(foundmeet)
    }catch(error){
        res.status(500).json(error)
    }
})

meetgreet.post('/',async (req,res)=>{
    try{
        const newmeet=await meet.create(req.body)
        res.status(200).json({
            message:"Successfully inserted a new band",
            data:newmeet
        })
    }catch(err){
        res.status(500).json(err)
    }
})

meetgreet.put('/:id',async(req,res)=>{
    try{
        const updatedmeets=await meet.update(req.body,{
            where:{
                meet_id:req.params.id
            }
        })
        res.status(200).json({
            message:`Successfully updated ${updatedmeets} band(s)`
        })
    }catch(err){
        res.status(500).json(err)
    }
})

// DELETE A BAND
meetgreet.delete('/:id', async (req, res) => {
    try {
        const deletedmeets = await meet.destroy({
            where: {
                meet_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedmeets} meet(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports=meets