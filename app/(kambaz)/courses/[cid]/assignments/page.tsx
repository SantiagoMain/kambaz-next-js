"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAssignments, deleteAssignment } from "./reducer";
import {
    ListGroup, ListGroupItem, Button, InputGroup,
    FormControl, Modal,
} from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import * as client from "../../client";

export default function Assignments() {
    const { cid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };

    const handleDeleteClick = (assignmentId: string) => {
        setSelectedId(assignmentId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedId) {
            await client.deleteAssignment(selectedId);
            dispatch(deleteAssignment(selectedId));
        }
        setShowDeleteModal(false);
        setSelectedId(null);
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div id="wd-assignments" className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <InputGroup className="w-50">
                    <span className="input-group-text bg-white border-end-0">
                        <BsSearch />
                    </span>
                    <FormControl id="wd-search-assignment"
                        placeholder="Search for Assignments"
                        className="border-start-0" />
                </InputGroup>
                <div className="d-nowrap">
                    <Button variant="secondary" id="wd-add-assignment-group" className="me-1">
                        <FaPlus className="me-1" /> Group
                    </Button>
                    <Button variant="danger" id="wd-add-assignment"
                        onClick={() => router.push(`/courses/${cid}/assignments/new`)}>
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>

            <ListGroup className="rounded-0" id="wd-assignments-list">
                <ListGroupItem className="wd-title p-0 mb-5 fs-5 border-gray">
                    <div className="bg-secondary p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <FaCaretDown className="me-2" />
                            <b id="wd-assignments-title">ASSIGNMENTS</b>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="border border-dark rounded-pill px-3 py-1 me-3 fs-6">
                                40% of Total
                            </span>
                            <FaPlus className="me-3" />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {assignments.map((assignment: any) => (
                            <ListGroupItem key={assignment._id}
                                className="wd-assignment-list-item d-flex align-items-center p-3">
                                <BsGripVertical className="me-3 fs-3 text-secondary" />
                                <div className="flex-grow-1">
                                    <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                                        className="wd-assignment-link text-danger text-decoration-none fw-bold">
                                        {assignment.title}
                                    </Link>
                                    <div className="fs-6 mt-1">
                                        <span className="text-danger">Multiple Modules</span> |{" "}
                                        <b>Not available until</b> {assignment.available} |{" "}
                                        <br />
                                        <b>Due</b> {assignment.due} | {assignment.points} pts
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FaTrash className="text-danger me-3 fs-5"
                                        onClick={() => handleDeleteClick(assignment._id)}
                                        style={{ cursor: "pointer" }} />
                                    <FaCheckCircle className="text-success me-3 fs-5" />
                                    <IoEllipsisVertical className="fs-4" />
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}