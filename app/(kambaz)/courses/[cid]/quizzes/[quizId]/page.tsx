"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";

export default function QuizDetails() {
    const { cid, quizId } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = (currentUser as any)?.role === "FACULTY" || (currentUser as any)?.role === "ADMIN";

    const fetchQuiz = async () => {
        const quiz = await client.findQuizById(quizId as string);
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    if (!quiz) return <div>Loading...</div>;

    return (
        <div id="wd-quiz-details" className="p-4">
            {isFaculty && (
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-secondary me-2"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/preview`)}>
                        Preview
                    </button>
                    <button className="btn btn-secondary"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/editor`)}>
                        ✏️ Edit
                    </button>
                </div>
            )}
            <h2>{quiz.title}</h2>
            <hr />
            <table className="table">
                <tbody>
                    <tr><td><b>Quiz Type</b></td><td>{quiz.quizType}</td></tr>
                    <tr><td><b>Points</b></td><td>{quiz.points}</td></tr>
                    <tr><td><b>Assignment Group</b></td><td>{quiz.assignmentGroup}</td></tr>
                    <tr><td><b>Shuffle Answers</b></td><td>{quiz.shuffleAnswers ? "Yes" : "No"}</td></tr>
                    <tr><td><b>Time Limit</b></td><td>{quiz.timeLimit} Minutes</td></tr>
                    <tr><td><b>Multiple Attempts</b></td><td>{quiz.multipleAttempts ? "Yes" : "No"}</td></tr>
                    <tr><td><b>How Many Attempts</b></td><td>{quiz.howManyAttempts}</td></tr>
                    <tr><td><b>Show Correct Answers</b></td><td>{quiz.showCorrectAnswers}</td></tr>
                    <tr><td><b>Access Code</b></td><td>{quiz.accessCode || "None"}</td></tr>
                    <tr><td><b>One Question at a Time</b></td><td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td></tr>
                    <tr><td><b>Webcam Required</b></td><td>{quiz.webcamRequired ? "Yes" : "No"}</td></tr>
                    <tr><td><b>Lock Questions After Answering</b></td><td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td></tr>
                    <tr><td><b>Due Date</b></td><td>{quiz.dueDate || "N/A"}</td></tr>
                    <tr><td><b>Available Date</b></td><td>{quiz.availableDate || "N/A"}</td></tr>
                    <tr><td><b>Until Date</b></td><td>{quiz.untilDate || "N/A"}</td></tr>
                </tbody>
            </table>
            {!isFaculty && (
                <button className="btn btn-danger"
                    onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/take`)}>
                    Take Quiz
                </button>
            )}
        </div>
    );
}