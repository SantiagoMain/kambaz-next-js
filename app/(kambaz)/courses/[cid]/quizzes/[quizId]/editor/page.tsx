"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";

export default function QuizEditor() {
    const { cid, quizId } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("details");
    const [quiz, setQuiz] = useState<any>({
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
        dueDate: "",
        availableDate: "",
        untilDate: "",
        published: false,
        questions: [],
    });

    const fetchQuiz = async () => {
        const data = await client.findQuizById(quizId as string);
        setQuiz(data);
    };

    const handleSave = async () => {
        await client.updateQuiz(quiz);
        router.push(`/courses/${cid}/quizzes/${quizId}`);
    };

    const handleSaveAndPublish = async () => {
        await client.updateQuiz({ ...quiz, published: true });
        await client.publishQuiz(quizId as string);
        router.push(`/courses/${cid}/quizzes`);
    };

    const handleCancel = () => {
        router.push(`/courses/${cid}/quizzes`);
    };

    const addQuestion = () => {
        const newQuestion = {
            _id: `q${Date.now()}`,
            title: "New Question",
            type: "Multiple Choice",
            points: 1,
            question: "",
            choices: [
                { _id: `c${Date.now()}1`, text: "", isCorrect: false },
                { _id: `c${Date.now()}2`, text: "", isCorrect: false },
            ],
            correctAnswer: "",
        };
        setQuiz({ ...quiz, questions: [...(quiz.questions || []), newQuestion] });
    };

    const updateQuestion = (index: number, updates: any) => {
        const newQuestions = quiz.questions.map((q: any, i: number) =>
            i === index ? { ...q, ...updates } : q
        );
        setQuiz({ ...quiz, questions: newQuestions });
    };

    const deleteQuestion = (index: number) => {
        const newQuestions = quiz.questions.filter((_: any, i: number) => i !== index);
        setQuiz({ ...quiz, questions: newQuestions });
    };

    const addChoice = (qIndex: number) => {
        const newChoices = [...quiz.questions[qIndex].choices,
            { _id: `c${Date.now()}`, text: "", isCorrect: false }];
        updateQuestion(qIndex, { choices: newChoices });
    };

    const updateChoice = (qIndex: number, cIndex: number, text: string) => {
        const newChoices = quiz.questions[qIndex].choices.map((c: any, i: number) =>
            i === cIndex ? { ...c, text } : c
        );
        updateQuestion(qIndex, { choices: newChoices });
    };

    const setCorrectChoice = (qIndex: number, cIndex: number) => {
        const newChoices = quiz.questions[qIndex].choices.map((c: any, i: number) =>
            ({ ...c, isCorrect: i === cIndex })
        );
        updateQuestion(qIndex, { choices: newChoices });
    };

    const deleteChoice = (qIndex: number, cIndex: number) => {
        const newChoices = quiz.questions[qIndex].choices.filter((_: any, i: number) => i !== cIndex);
        updateQuestion(qIndex, { choices: newChoices });
    };

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

    return (
        <div id="wd-quiz-editor" className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{quiz.title}</h3>
                <span>Points {totalPoints} &nbsp;
                    {quiz.published
                        ? <span className="text-success">✅ Published</span>
                        : <span className="text-secondary">🚫 Not Published</span>}
                </span>
            </div>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                        onClick={() => setActiveTab("details")}>Details</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
                        onClick={() => setActiveTab("questions")}>Questions</button>
                </li>
            </ul>

            {activeTab === "details" && (
                <div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input className="form-control" value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea className="form-control" rows={3} value={quiz.description}
                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Quiz Type</label>
                        <select className="form-select" value={quiz.quizType}
                            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                            <option>Graded Quiz</option>
                            <option>Practice Quiz</option>
                            <option>Graded Survey</option>
                            <option>Ungraded Survey</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Assignment Group</label>
                        <select className="form-select" value={quiz.assignmentGroup}
                            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                            <option>Quizzes</option>
                            <option>Exams</option>
                            <option>Assignments</option>
                            <option>Project</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Time Limit (minutes)</label>
                        <input type="number" className="form-control w-25" value={quiz.timeLimit}
                            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={quiz.shuffleAnswers}
                            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                        <label className="form-check-label">Shuffle Answers</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={quiz.multipleAttempts}
                            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} />
                        <label className="form-check-label">Multiple Attempts</label>
                    </div>
                    {quiz.multipleAttempts && (
                        <div className="mb-3">
                            <label className="form-label fw-bold">How Many Attempts</label>
                            <input type="number" className="form-control w-25" value={quiz.howManyAttempts}
                                onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })} />
                        </div>
                    )}
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={quiz.oneQuestionAtATime}
                            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />
                        <label className="form-check-label">One Question at a Time</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={quiz.webcamRequired}
                            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
                        <label className="form-check-label">Webcam Required</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={quiz.lockQuestionsAfterAnswering}
                            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })} />
                        <label className="form-check-label">Lock Questions After Answering</label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Access Code</label>
                        <input className="form-control w-50" value={quiz.accessCode}
                            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Show Correct Answers</label>
                        <select className="form-select w-50" value={quiz.showCorrectAnswers}
                            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}>
                            <option>Immediately</option>
                            <option>After Due Date</option>
                            <option>Never</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Due Date</label>
                        <input type="date" className="form-control w-50" value={quiz.dueDate}
                            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Available Date</label>
                        <input type="date" className="form-control w-50" value={quiz.availableDate}
                            onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Until Date</label>
                        <input type="date" className="form-control w-50" value={quiz.untilDate}
                            onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })} />
                    </div>
                </div>
            )}

            {activeTab === "questions" && (
                <div>
                    <div className="text-end mb-3">
                        <strong>Points: {totalPoints}</strong>
                    </div>
                    {quiz.questions?.map((question: any, qIndex: number) => (
                        <div key={question._id} className="card mb-3 p-3">
                            <div className="d-flex justify-content-between mb-2">
                                <input className="form-control w-50" placeholder="Question Title"
                                    value={question.title}
                                    onChange={(e) => updateQuestion(qIndex, { title: e.target.value })} />
                                <select className="form-select w-25"
                                    value={question.type}
                                    onChange={(e) => updateQuestion(qIndex, { type: e.target.value })}>
                                    <option>Multiple Choice</option>
                                    <option>True/False</option>
                                    <option>Fill in the Blank</option>
                                </select>
                                <div className="d-flex align-items-center">
                                    <label className="me-2">pts:</label>
                                    <input type="number" className="form-control" style={{ width: "70px" }}
                                        value={question.points}
                                        onChange={(e) => updateQuestion(qIndex, { points: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <textarea className="form-control mb-2" placeholder="Question text"
                                value={question.question}
                                onChange={(e) => updateQuestion(qIndex, { question: e.target.value })} />

                            {question.type === "Multiple Choice" && (
                                <div>
                                    <label className="fw-bold">Answers:</label>
                                    {question.choices?.map((choice: any, cIndex: number) => (
                                        <div key={choice._id} className="d-flex align-items-center mb-2">
                                            <input type="radio" className="me-2"
                                                checked={choice.isCorrect}
                                                onChange={() => setCorrectChoice(qIndex, cIndex)} />
                                            <input className="form-control me-2" placeholder="Choice text"
                                                value={choice.text}
                                                onChange={(e) => updateChoice(qIndex, cIndex, e.target.value)} />
                                            <button className="btn btn-sm btn-danger"
                                                onClick={() => deleteChoice(qIndex, cIndex)}>🗑</button>
                                        </div>
                                    ))}
                                    <button className="btn btn-sm btn-secondary mt-1"
                                        onClick={() => addChoice(qIndex)}>+ Add Another Answer</button>
                                </div>
                            )}

                            {question.type === "True/False" && (
                                <div>
                                    <label className="fw-bold">Correct Answer:</label>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input"
                                            checked={question.correctAnswer === "True"}
                                            onChange={() => updateQuestion(qIndex, { correctAnswer: "True" })} />
                                        <label className="form-check-label text-success">True</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input"
                                            checked={question.correctAnswer === "False"}
                                            onChange={() => updateQuestion(qIndex, { correctAnswer: "False" })} />
                                        <label className="form-check-label">False</label>
                                    </div>
                                </div>
                            )}

                            {question.type === "Fill in the Blank" && (
                                <div>
                                    <label className="fw-bold">Possible Correct Answers:</label>
                                    {(question.choices || []).map((choice: any, cIndex: number) => (
                                        <div key={choice._id} className="d-flex align-items-center mb-2">
                                            <input className="form-control me-2" placeholder="Possible Answer"
                                                value={choice.text}
                                                onChange={(e) => updateChoice(qIndex, cIndex, e.target.value)} />
                                            <button className="btn btn-sm btn-danger"
                                                onClick={() => deleteChoice(qIndex, cIndex)}>🗑</button>
                                        </div>
                                    ))}
                                    <button className="btn btn-sm btn-secondary mt-1"
                                        onClick={() => addChoice(qIndex)}>+ Add Another Answer</button>
                                </div>
                            )}

                            <div className="d-flex justify-content-end mt-2">
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-secondary" onClick={addQuestion}>
                        + New Question
                    </button>
                </div>
            )}

            <hr />
            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-secondary" onClick={handleSave}>Save</button>
                <button className="btn btn-danger" onClick={handleSaveAndPublish}>Save & Publish</button>
            </div>
        </div>
    );
}