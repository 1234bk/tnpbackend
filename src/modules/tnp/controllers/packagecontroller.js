import Company from "../models/company.js";
import Package from "../models/Package.js";


export const addpackage = async (req, res) => {
    try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // req.file.path contains the Cloudinary URL
    const newPackage = new Package({ imageUrl: req.file.path });
    await newPackage.save();
    res.status(201).json({ message: "Package saved", data: newPackage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export const company = async (req, res) => {
    try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // req.file.path contains the Cloudinary URL
    const newPackage = new Company({ imageUrl: req.file.path });
    await newPackage.save();
    res.status(201).json({ message: "Package saved", data: newPackage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


export const getallpackages = async (req, res) => {
  try {
    const packages = await Package.find({}, "imageUrl").lean();
    // returns [{ imageUrl: "..." }, ...]
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export const getallcompany = async (req, res) => {
  try {
    const packages = await Company.find({}, "imageUrl").lean();
    // returns [{ imageUrl: "..." }, ...]
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}