import { fetchApi } from ".";
const pathname = "/course";

export const getCourseByCategory = async (
  category: string,
  pageSize: number,
  pageIndex: number
) => {
  try {
    const url =
      pathname +
      `/get-by-category?category=${category}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

    const response = await fetchApi().get(url);

    return response;
  } catch (error) {
    throw error;
  }
};

export const validateLessonCode = async (lessonCode: string, lessonId: string) => {
  try {
  
    const response = await fetchApi().post(`/lesson/validate-lesson-code/${lessonId}?lessonCode=${lessonCode}`);

    return response;
  } catch (error) {
    throw error
  }
}