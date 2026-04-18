import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const QUIZ_ATTEMPTS_API = `${HTTP_SERVER}/api/quizattempts`;

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const publishQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`);
    return response.data;
};
export const unpublishQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/unpublish`);
    return response.data;
};

export const saveAttempt = async (attempt: any) => {
    const response = await axiosWithCredentials.post(QUIZ_ATTEMPTS_API, attempt);
    return response.data;
};
export const findAttemptsForUser = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZ_ATTEMPTS_API}/${quizId}/${userId}`);
    return response.data;
};
export const findLatestAttempt = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZ_ATTEMPTS_API}/${quizId}/${userId}/latest`);
    return response.data;
};
export const countAttempts = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZ_ATTEMPTS_API}/${quizId}/${userId}/count`);
    return response.data;
};