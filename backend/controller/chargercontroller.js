const express = require("express");
const Charger = require('../model/Charger');
const {protectRoute} = require('../middleware/authmidleware')

//create charger
const CreateCharger = async (req, res) => {
    try {
        const charger = new Charger(req.body);
        console.log(charger);
        await charger.save();
        res.status(201).json(charger);
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
// list charger 
const allCharger = async(req,res) =>{
    try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.connectorType) filters.connectorType = req.query.connectorType;
    if (req.query.minPower) filters.powerOutput = { $gte: Number(req.query.minPower) };
    if (req.query.maxPower) filters.powerOutput = { ...filters.powerOutput, $lte: Number(req.query.maxPower) };

    const chargers = await Charger.find(filters);
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateCharger = async(req,res) =>{
    try {
        //   console.log('Incoming PUT request for ID:', req.params.id);
    console.log('Request body:', req.body);
        const charger = await Charger.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log('Update payload:', charger);
        if(!charger) return res.status(404).json({message:"charger not found"});
        res.json(charger);
    } catch (error) {
          console.error('Update error:', error);
        res.status(400).json({message:err.message});
    }
}

const deleteCharger = async(req,res) =>{
    try {
        //   console.log('Incoming PUT request for ID:', req.params.id);
    console.log('Request body:', req.body);
        const charger = await Charger.findByIdAndDelete(req.params.id,req.body,)
    console.log('Update payload:', charger);
        if(!charger) return res.status(404).json({message:"charger not found"});
        res.json(charger);
    } catch (error) {
          console.error('Update error:', error);
        res.status(400).json({message:err.message});
    }
}
const getCharger = async(req,res) =>{
      const { id } = req.params;
  try {
    const charger = await Charger.findById(id);
    if (!charger) return res.status(404).json({ message: 'Not found' });
    res.json(charger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = {CreateCharger,allCharger,updateCharger,getCharger,deleteCharger};