import React from "react";
import Link from "next/link";
import { 
  ListGroup, 
  ListGroupItem, 
  Button, 
  InputGroup, 
  FormControl, 
  Row, 
  Col 
} from "react-bootstrap";

import { BsGripVertical, BsSearch } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <span className="input-group-text bg-white border-end-0">
            <BsSearch />
          </span>
          <FormControl
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            className="border-start-0"
          />
        </InputGroup>
        
        <div className="d-nowrap">
          <Button variant="secondary" id="wd-add-assignment-group" className="me-1">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
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
            {[
              { id: "123", title: "A1 - ENV + HTML", available: "May 6 at 12:00am", due: "May 13 at 11:59pm", pts: 100 },
              { id: "124", title: "A2 - CSS + BOOTSTRAP", available: "May 13 at 12:00am", due: "May 20 at 11:59pm", pts: 100 },
              { id: "125", title: "A3 - JAVASCRIPT + REACT", available: "May 20 at 12:00am", due: "May 27 at 11:59pm", pts: 100 },
            ].map((assignment) => (
              <ListGroupItem key={assignment.id} className="wd-assignment-list-item d-flex align-items-center p-3">
                <BsGripVertical className="me-3 fs-3 text-secondary" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/1234/assignments/${assignment.id}`}
                    className="wd-assignment-link text-danger text-decoration-none fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <div className="fs-6 mt-1">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {assignment.available} | <br />
                    <b>Due</b> {assignment.due} | {assignment.pts} pts
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3 fs-5" />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}