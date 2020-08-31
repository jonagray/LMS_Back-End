module.exports = mongoose => {
  const Lesson = mongoose.model(
    "lesson",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
        hideDescription: Boolean,
        url: String,
        hideQuestions: Boolean
      },
      { timestamps: true }
    )
  );

  return Lesson;
};