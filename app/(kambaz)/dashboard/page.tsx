"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { setCourses } from "../courses/reducer";
import { setEnrollments, enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    const fetchCourses = async () => {
        try {
            if (showAllCourses) {
                const allCourses = await client.fetchAllCourses();
                dispatch(setCourses(allCourses));
            } else {
                const myCourses = await client.findMyCourses();
                dispatch(setCourses(myCourses));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEnrollments = async () => {
        try {
            const enrollments = await client.findAllEnrollments();
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error(error);
        }
    };

    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([...courses, newCourse]));
    };

    const onDeleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await client.updateCourse(course);
        dispatch(setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })));
    };

    const onEnroll = async (courseId: string) => {
        await client.enrollUserInCourse("current", courseId);
        dispatch(enroll({ userId: (currentUser as any)._id, courseId }));
        fetchCourses();
    };

    const onUnenroll = async (courseId: string) => {
        await client.unenrollUserFromCourse("current", courseId);
        dispatch(unenroll({ userId: (currentUser as any)._id, courseId }));
        fetchCourses();
    };

    const isEnrolled = (courseId: string) =>
        enrollments.some(
            (e: any) => e.user === (currentUser as any)?._id && e.course === courseId
        );

    useEffect(() => {
        fetchCourses();
        fetchEnrollments();
    }, [currentUser, showAllCourses]);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard
                <Button className="float-end btn-primary"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    id="wd-enrollments-btn">
                    Enrollments
                </Button>
            </h1>
            <hr />
            <h5>New Course
                <Button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={onAddNewCourse}>
                    Add
                </Button>
                <Button className="btn btn-warning float-end me-2"
                    id="wd-update-course-click"
                    onClick={onUpdateCourse}>
                    Update
                </Button>
            </h5>
            <br />
            <FormControl value={course.name} className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <FormControl as="textarea" value={course.description} rows={3}
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((c: any) => (
                        <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        {c.name}
                                    </CardTitle>
                                    <CardText className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "60px" }}>
                                        {c.description}
                                    </CardText>
                                    {isEnrolled(c._id) ? (
                                        <>
                                            <Link href={`/courses/${c._id}/home`}>
                                                <Button variant="primary" className="me-2">Go</Button>
                                            </Link>
                                            <Button variant="danger" className="me-2"
                                                onClick={() => onUnenroll(c._id)}>
                                                Unenroll
                                            </Button>
                                        </>
                                    ) : (
                                        <Button variant="success"
                                            onClick={() => onEnroll(c._id)}>
                                            Enroll
                                        </Button>
                                    )}
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        onDeleteCourse(c._id);
                                    }}
                                        variant="danger"
                                        className="float-end"
                                        id="wd-delete-course-click">
                                        Delete
                                    </Button>
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        setCourse(c);
                                    }}
                                        variant="warning"
                                        className="float-end me-2"
                                        id="wd-edit-course-click">
                                        Edit
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}