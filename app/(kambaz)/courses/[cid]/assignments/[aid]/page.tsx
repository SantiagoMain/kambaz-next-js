"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  FormControl,
  FormLabel,
  FormSelect,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";
import * as db from "../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="p-4">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue={assignment?.title || ""} />
      </div>

      <div className="mb-4">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={4}
          defaultValue={assignment?.description || ""}
        />
      </div>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col sm={9}>
          <FormControl id="wd-points" defaultValue={assignment?.points || 100} />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect id="wd-display-grade-as">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
            <option value="COMPLETE">Complete/Incomplete</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end mt-2">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col sm={9}>
          <div className="border p-3 rounded">
            <FormSelect id="wd-submission-type" className="mb-3">
              <option value="ONLINE">Online</option>
              <option value="PAPER">Paper</option>
              <option value="EXTERNAL">External Tool</option>
            </FormSelect>

            <b className="d-block mb-2">Online Entry Options</b>
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
            <FormCheck type="checkbox" id="wd-website-url" label="Website URL" className="mb-2" defaultChecked />
            <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" />
            <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" />
            <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end mt-2">
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col sm={9}>
          <div className="border p-3 rounded">
            <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
            <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
            <FormControl id="wd-due-date" defaultValue={assignment?.due || ""} className="mb-3" />

            <Row>
              <Col sm={6}>
                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                <FormControl id="wd-available-from" defaultValue={assignment?.available || ""} />
              </Col>
              <Col sm={6}>
                <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                <FormControl id="wd-available-until" defaultValue="" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end">
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="secondary" className="me-2" id="wd-assignment-cancel">
            Cancel
          </Button>
        </Link>
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="danger" id="wd-assignment-save">
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
}