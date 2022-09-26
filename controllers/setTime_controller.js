const Times= require('express').Router()
const db= require('../models')
const{Time}=db

setTime.get('/', async (req, res) => {
    try {
        const foundTime = await Time.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ]
        })
        res.status(200).json(foundTime)
    } catch (error) {
        res.status(500).json(error)
    }
})



setTime.get('/:id',async(req,res)=>{
    try{
        const foundTime=await Time.findOne({
            where:{band_id:req.params.id}
        })
        res.status(200).json(foundTime)
    }catch(error){
        res.status(500).json(error)
    }
})

setTime.post('/',async (req,res)=>{
    try{
        const newTime=await Time.create(req.body)
        res.status(200).json({
            message:"Successfully inserted a new Time",
            data:newTime
        })
    }catch(err){
        res.status(500).json(err)
    }
})

setTime.put('/:id',async(req,res)=>{
    try{
        const updatedTimes=await Time.update(req.body,{
            where:{
                time_id:req.params.id
            }
        })
        res.status(200).json({
            message:`Successfully updated ${updatedTimes} Time(s)`
        })
    }catch(err){
        res.status(500).json(err)
    }
})

// DELETE A BAND
setTime.delete('/:id', async (req, res) => {
    try {
        const deletedTime = await Time.destroy({
            where: {
                time_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedTime} Time(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports=Times