import express from "express";
import Admin from "../../../models/Admin.js";

export const addadmin = async(req,res) =>{

    try{
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json({ message: "Admin added successfully!", data: admin });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}