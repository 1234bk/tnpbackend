import express from "express";
import TpoMember from "../models/tpomember.js";


export const addtpomember = async (req, res) => {
    try {
    const { name, role, email, contact,department } = req.body;

    const member = new TpoMember({ name, role, email, contact , department });
    await member.save();

    res.status(201).json({ message: "TPO Member added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding TPO Member" });
  }

};


export const gettpomember = async (req, res) => {
    try {
    const members = await TpoMember.find();
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching members" });
  } 
}

export const deletetpomember = async (req, res) => {
    try {
    const member = await TpoMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting member" });
  }
}