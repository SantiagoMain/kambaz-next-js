"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

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

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === (currentUser as any)?._id && e.course === courseId
    );

  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id));

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
                onClick={() => dispatch(addNewCourse(course))}>
          Add
        </Button>
        <Button className="btn btn-warning float-end me-2"
                id="wd-update-course-click"
                onClick={() => dispatch(updateCourse(course))}>
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
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((c: any) => (
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
                      <Button variant="danger"
                              onClick={() => dispatch(unenroll({
                                userId: (currentUser as any)?._id,
                                courseId: c._id
                              }))}>
                        Unenroll
                      </Button>
                    </>
                  ) : (
                    <Button variant="success"
                            onClick={() => dispatch(enroll({
                              userId: (currentUser as any)?._id,
                              courseId: c._id
                            }))}>
                      Enroll
                    </Button>
                  )}
                  <Button onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(c._id));
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