import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <Table striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-3 text-secondary" />
              <span className="text-danger">Vinny Jackson</span>
            </td>
            <td className="wd-login-id">001234567S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">Student</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-3 text-secondary" />
              <span className="text-danger">Daniel Stevens</span>
            </td>
            <td className="wd-login-id">001234568B</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">Student</td>
            <td className="wd-last-activity">2020-11-05</td>
            <td className="wd-total-activity">15:30:10</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-3 text-secondary" />
              <span className="text-danger">Chris Warren</span>
            </td>
            <td className="wd-login-id">001234569R</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">Student</td>
            <td className="wd-last-activity">2020-09-15</td>
            <td className="wd-total-activity">22:15:00</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-3 text-secondary" />
              <span className="text-danger">Aragorn Elesar</span>
            </td>
            <td className="wd-login-id">001234570W</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2020-12-01</td>
            <td className="wd-total-activity">45:00:00</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}