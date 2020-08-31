const db = require("../models");
const Lesson = db.lesson;

// Create and Save a new lesson
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a lesson
  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    url: req.body.url
  });

  // Save lesson in the database
  lesson
    .save(lesson)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the lesson."
      });
    });
};

// Retrieve all lessons from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Lesson.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons."
      });
    });
};

// Find a single lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Lesson.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found lesson with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving lesson with id=" + id });
    });
};

// Update a lesson by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update lesson with id=${id}. Maybe lesson was not found!`
        });
      } else res.send({ message: "lesson was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating lesson with id=" + id
      });
    });
};

// Delete a lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Lesson.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete lesson with id=${id}. Maybe lesson was not found!`
        });
      } else {
        res.send({
          message: "lesson was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete lesson with id=" + id
      });
    });
};

// Delete all lessons from the database.
// exports.deleteAll = (req, res) => {
  
// };

// Find all published lessons
exports.findAllPublished = (req, res) => {
  Lesson.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons."
      });
    });
};