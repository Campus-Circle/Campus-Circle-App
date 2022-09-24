export const CourseGenerator = (
  course,
  semester,
  PaperCode,
  type = "course"
) => {
  return `${process.env.NEXT_PUBLIC_URL}/${type}/${
    semester < 3 ? "ALL" : course
  }/${semester}/${PaperCode.trim().replace("-", "")}.pdf`;
};

export const PYQGenerator = (course, semester, fileName) => `
    ${process.env.NEXT_PUBLIC_URL}/pyq/${
  semester < 3 ? "ALL" : course
}/${semester}/${fileName}.pdf
`;
