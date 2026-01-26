import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        {/* Add at least 6 more courses here */}
      </div>
      <div className="wd-dashboard-course">
  <Link href="/courses/1235" className="wd-dashboard-course-link">
    <Image src="/images/nodejs.jpg" width={200} height={150} alt="Node.js" />
    <div>
      <h5>CS1235 Node.js</h5>
      <p className="wd-dashboard-course-title">
        Backend Development
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/courses/1236" className="wd-dashboard-course-link">
    <Image src="/images/python.jpg" width={200} height={150} alt="Python" />
    <div>
      <h5>CS1236 Python</h5>
      <p className="wd-dashboard-course-title">
        Data Science and Machine Learning
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/courses/2362" className="wd-dashboard-course-link">
    <Image src="/images/aperture.jpg" width={200} height={150} alt="Python" />
    <div>
      <h5>CS2362 Java</h5>
      <p className="wd-dashboard-course-title">
        OOD/OOP
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/courses/4372" className="wd-dashboard-course-link">
    <Image src="/images/blackmesa.jpg" width={200} height={150} alt="Python" />
    <div>
      <h5>CS4372 Assembly</h5>
      <p className="wd-dashboard-course-title">
        Computer Systems
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/courses/7428" className="wd-dashboard-course-link">
    <Image src="/images/trinity.jpg" width={200} height={150} alt="Python" />
    <div>
      <h5>CS7428 TempleOS</h5>
      <p className="wd-dashboard-course-title">
        Terry Davis
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/courses/7162" className="wd-dashboard-course-link">
    <Image src="/images/triangle.jpg" width={200} height={150} alt="Python" />
    <div>
      <h5>CS7162 Cryptography</h5>
      <p className="wd-dashboard-course-title">
        Encryption
      </p>
      <button>Go</button>
    </div>
  </Link>
</div>
    </div>
  );
}