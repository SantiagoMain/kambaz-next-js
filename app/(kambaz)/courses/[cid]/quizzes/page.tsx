"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaBan, FaPlus, FaRocket } from "react-icons/fa";
import * as client from "./client";

export default function Quizzes() {
    const { cid } = useParams();
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [lastAttempts, setLastAttempts] = useState<any>({});
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = (currentUser as any)?.role === "FACULTY" || (currentUser as any)?.role === "ADMIN";

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        setQuizzes(quizzes);
    };

    const fetchLastAttempts = async (quizList: any[]) => {
        const userId = (currentUser as any)?._id;
        if (!userId || isFaculty) return;
        const attempts: any = {};
        for (const quiz of quizList) {
            try {
                const attempt = await client.findLatestAttempt(quiz._id, userId);
                if (attempt) attempts[quiz._id] = attempt;
            } catch (e) {
                // no attempt yet
            }
        }
        setLastAttempts(attempts);
    };

    const handleAddQuiz = async () => {
        const newQuiz = await client.createQuiz(cid as string, {
            title: "Unnamed Quiz",
            description: "",
            quizType: "Graded Quiz",
            points: 0,
            assignmentGroup: "Quizzes",
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            howManyAttempts: 1,
            showCorrectAnswers: "Immediately",
            accessCode: "",
            oneQuestionAtATime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            published: false,
            questions: [],
        });
        router.push(`/courses/${cid}/quizzes/${newQuiz._id}/editor`);
    };

    const handleDeleteQuiz = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        setQuizzes(quizzes.filter((q) => q._id !== quizId));
    };

    const handleTogglePublish = async (quiz: any) => {
        if (quiz.published) {
            await client.unpublishQuiz(quiz._id);
        } else {
            await client.publishQuiz(quiz._id);
        }
        setQuizzes(quizzes.map((q) =>
            q._id === quiz._id ? { ...q, published: !q.published } : q
        ));
    };

    const getAvailability = (quiz: any) => {
        const now = new Date();
        const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
        const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
        if (until && now > until) return "Closed";
        if (available && now < available) return `Not available until ${quiz.availableDate}`;
        return "Available";
    };

    useEffect(() => {
        const loadData = async () => {
            const quizList = await client.findQuizzesForCourse(cid as string);
            setQuizzes(quizList);
            await fetchLastAttempts(quizList);
        };
        loadData();
    }, [cid]);

    return (
        <div id="wd-quizzes">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Quizzes</h3>
                {isFaculty && (
                    <button className="btn btn-danger" onClick={handleAddQuiz}>
                        <FaPlus className="me-2" />
                        Quiz
                    </button>
                )}
            </div>
            {quizzes.length === 0 ? (
                <p>No quizzes yet. Click <strong>+ Quiz</strong> to add one.</p>
            ) : (
                <ul className="list-group rounded-0">
                    {quizzes
                        .filter((q) => isFaculty || q.published)
                        .map((quiz) => (
                            <li key={quiz._id}
                                className="list-group-item d-flex justify-content-between align-items-center p-3 border-start border-success border-4">
                                <div className="d-flex align-items-center">
                                    <FaRocket className="me-3 text-success fs-4" />
                                    <div>
                                        <div className="fw-bold"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}`)}>
                                            {quiz.title}
                                        </div>
                                        <small className="text-muted">
                                            {getAvailability(quiz)} | Due: {quiz.dueDate || "N/A"} | {quiz.points} pts | {quiz.questions?.length || 0} Questions
                                        </small>
                                        {!isFaculty && lastAttempts[quiz._id] && (
                                            <div>
                                                <small className="text-success fw-bold">
                                                    Last Score: {lastAttempts[quiz._id].score} / {lastAttempts[quiz._id].totalPoints}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {isFaculty && (
                                        <>
                                            <span onClick={() => handleTogglePublish(quiz)}
                                                style={{ cursor: "pointer" }} className="me-3">
                                                {quiz.published
                                                    ? <FaCheckCircle className="text-success fs-5" />
                                                    : <FaBan className="text-danger fs-5" />}
                                            </span>
                                            <div className="dropdown">
                                                <BsThreeDotsVertical
                                                    className="fs-5"
                                                    style={{ cursor: "pointer" }}
                                                    data-bs-toggle="dropdown" />
                                                <ul className="dropdown-menu">
                                                    <li><button className="dropdown-item"
                                                        onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/editor`)}>
                                                        Edit
                                                    </button></li>
                                                    <li><button className="dropdown-item"
                                                        onClick={() => handleDeleteQuiz(quiz._id)}>
                                                        Delete
                                                    </button></li>
                                                    <li><button className="dropdown-item"
                                                        onClick={() => handleTogglePublish(quiz)}>
                                                        {quiz.published ? "Unpublish" : "Publish"}
                                                    </button></li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}