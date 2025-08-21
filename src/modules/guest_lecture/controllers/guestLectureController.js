import GuestLecture from "../models/guestLecture.js";

// CREATE lecture
export const createLecture = async (req, res) => {
  try {
    const { teacher, venue, class: cls, time, topic, date } = req.body;

    const newLecture = new GuestLecture({
      teacher,
      venue,
      class: cls,
      time,
      topic,
      date,
      images: req.files?.images ? req.files.images[0].path : null,
      banner: req.files?.banner ? req.files.banner[0].path : null,
    });

    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// GET all lectures
export const getLectures = async (req, res) => {
  try {
    const lectures = await GuestLecture.find().sort({ date: 1 });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE done
export const toggleDone = async (req, res) => {
  try {
    const lecture = await GuestLecture.findById(req.params.id);
    if (!lecture) return res.status(404).json({ message: "Not found" });

    lecture.done = !lecture.done;
    await lecture.save();
    res.json(lecture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE lecture
export const deleteLecture = async (req, res) => {
  try {
    await GuestLecture.findByIdAndDelete(req.params.id);
    res.json({ message: "Lecture deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
