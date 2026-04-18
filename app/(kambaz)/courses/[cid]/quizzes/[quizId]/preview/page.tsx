"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";

export default function QuizPreview() {
    const { cid, quizId } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const fetchQuiz = async () => {
        const data = await client.findQuizById(quizId as string);
        setQuiz(data);
    };

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const calculateScore = () => {
        let total = 0;
        quiz.questions.forEach((q: any) => {
            const userAnswer = answers[q._id];
            if (q.type === "Multiple Choice") {
                const correctChoice = q.choices.find((c: any) => c.isCorrect);
                if (correctChoice && userAnswer === correctChoice.text) {
                    total += q.points;
                }
            } else if (q.type === "True/False") {
                if (userAnswer === q.correctAnswer) {
                    total += q.points;
                }
            } else if (q.type === "Fill in the Blank") {
                const correctAnswers = q.choices.map((c: any) => c.text.toLowerCase());
                if (userAnswer && correctAnswers.includes(userAnswer.toLowerCase())) {
                    total += q.points;
                }
            }
        });
        return total;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setSubmitted(true);
    };

    const isCorrect = (question: any) => {
        const userAnswer = answers[question._id];
        if (question.type === "Multiple Choice") {
            const correctChoice = question.choices.find((c: any) => c.isCorrect);
            return correctChoice && userAnswer === correctChoice.text;
        } else if (question.type === "True/False") {
            return userAnswer === question.correctAnswer;
        } else if (question.type === "Fill in the Blank") {
            const correctAnswers = question.choices.map((c: any) => c.text.toLowerCase());
            return userAnswer && correctAnswers.includes(userAnswer.toLowerCase());
        }
        return false;
    };

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    if (!quiz) return <div>Loading...</div>;

    const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

    return (
        <div id="wd-quiz-preview" className="p-4">
            <div className="alert alert-warning">
                This is a preview of the published version of the quiz.
            </div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <hr />

            {submitted ? (
                <div>
                    <h4>Score: {score} / {totalPoints}</h4>
                    <hr />
                    {quiz.questions.map((question: any, index: number) => (
                        <div key={question._id} className={`card mb-3 p-3 border-3 ${isCorrect(question) ? "border-success" : "border-danger"}`}>
                            <div className="d-flex justify-content-between">
                                <strong>Question {index + 1}</strong>
                                <span>{question.points} pts</span>
                            </div>
                            <p>{question.question}</p>
                            <p>Your answer: <strong>{answers[question._id] || "No answer"}</strong>
                                {isCorrect(question)
                                    ? <span className="text-success ms-2">✓ Correct</span>
                                    : <span className="text-danger ms-2">✗ Incorrect</span>}
                            </p>
                        </div>
                    ))}
                    <button className="btn btn-secondary me-2"
                        onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/editor`)}>
                        ✏️ Keep Editing This Quiz
                    </button>
                </div>
            ) : (
                <div>
                    {quiz.oneQuestionAtATime ? (
                        <div>
                            <div className="card p-3 mb-3">
                                <div className="d-flex justify-content-between">
                                    <strong>Question {currentQuestion + 1}</strong>
                                    <span>{quiz.questions[currentQuestion]?.points} pts</span>
                                </div>
                                <p>{quiz.questions[currentQuestion]?.question}</p>
                                {quiz.questions[currentQuestion]?.type === "Multiple Choice" && (
                                    <div>
                                        {quiz.questions[currentQuestion].choices.map((choice: any) => (
                                            <div key={choice._id} className="form-check">
                                                <input type="radio" className="form-check-input"
                                                    checked={answers[quiz.questions[currentQuestion]._id] === choice.text}
                                                    onChange={() => handleAnswer(quiz.questions[currentQuestion]._id, choice.text)} />
                                                <label className="form-check-label">{choice.text}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {quiz.questions[currentQuestion]?.type === "True/False" && (
                                    <div>
                                        {["True", "False"].map((option) => (
                                            <div key={option} className="form-check">
                                                <input type="radio" className="form-check-input"
                                                    checked={answers[quiz.questions[currentQuestion]._id] === option}
                                                    onChange={() => handleAnswer(quiz.questions[currentQuestion]._id, option)} />
                                                <label className="form-check-label">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {quiz.questions[currentQuestion]?.type === "Fill in the Blank" && (
                                    <input className="form-control w-50"
                                        value={answers[quiz.questions[currentQuestion]._id] || ""}
                                        onChange={(e) => handleAnswer(quiz.questions[currentQuestion]._id, e.target.value)} />
                                )}
                            </div>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-secondary"
                                    disabled={currentQuestion === 0}
                                    onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                                    ← Previous
                                </button>
                                {currentQuestion < quiz.questions.length - 1 ? (
                                    <button className="btn btn-secondary"
                                        onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                                        Next →
                                    </button>
                                ) : (
                                    <button className="btn btn-danger" onClick={handleSubmit}>
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {quiz.questions.map((question: any, index: number) => (
                                <div key={question._id} className="card p-3 mb-3">
                                    <div className="d-flex justify-content-between">
                                        <strong>Question {index + 1}</strong>
                                        <span>{question.points} pts</span>
                                    </div>
                                    <p>{question.question}</p>
                                    {question.type === "Multiple Choice" && (
                                        <div>
                                            {question.choices.map((choice: any) => (
                                                <div key={choice._id} className="form-check">
                                                    <input type="radio" className="form-check-input"
                                                        checked={answers[question._id] === choice.text}
                                                        onChange={() => handleAnswer(question._id, choice.text)} />
                                                    <label className="form-check-label">{choice.text}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {question.type === "True/False" && (
                                        <div>
                                            {["True", "False"].map((option) => (
                                                <div key={option} className="form-check">
                                                    <input type="radio" className="form-check-input"
                                                        checked={answers[question._id] === option}
                                                        onChange={() => handleAnswer(question._id, option)} />
                                                    <label className="form-check-label">{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {question.type === "Fill in the Blank" && (
                                        <input className="form-control w-50"
                                            value={answers[question._id] || ""}
                                            onChange={(e) => handleAnswer(question._id, e.target.value)} />
                                    )}
                                </div>
                            ))}
                            <button className="btn btn-danger" onClick={handleSubmit}>
                                Submit Quiz
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}