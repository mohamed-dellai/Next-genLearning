"use client"
import {Nav} from "../../../components/nav"
import './main.css'
import {Button} from "../../materialTailwind/tailwindMaterial"
export default function Component() {
  return (
   <>
    <Nav/>
    <div className="container">
  <header>
    <h1>Courses list</h1>
   
  </header>
  <div className="search-bar">
    <input type="text" placeholder="Search for a course" />
  </div>
  <div className="course-grid">
    <div className="course-card">
      <img src="https://via.placeholder.com/150" alt="How to Make a Podcast" />
      <h3>How to Make a Podcast</h3>
      <p>7 lessons 3h 5m</p>
    </div>
    <div className="course-card">
      <img
        src="https://via.placeholder.com/150"
        alt="The Art of Storytelling"
      />
      <h3>The Art of Storytelling</h3>
      <p>8 lessons 2h 45m</p>
    </div>
    <div className="course-card">
      <img src="https://via.placeholder.com/150" alt="How to Build a Website" />
      <h3>How to Build a Website</h3>
      <p>6 lessons 1h 50m</p>
    </div>
    <div className="course-card">
      <img src="https://via.placeholder.com/150" alt="The Science of Sleep" />
      <h3>The Science of Sleep</h3>
      <p>5 lessons 2h 15m</p>
    </div>
    <div className="course-card">
      <img src="https://via.placeholder.com/150" alt="The History of Jazz" />
      <h3>The History of Jazz</h3>
      <p>9 lessons 3h 30m</p>
    </div>
    <div className="course-card">
      <img
        src="https://via.placeholder.com/150"
        alt="How to Make a Great Cup of Coffee"
      />
      <h3>How to Make a Great Cup of Coffee</h3>
      <p>4 lessons 1h 25m</p>
    </div>
    <div className="course-card">
      <img
        src="https://via.placeholder.com/150"
        alt="The Basics of Investing"
      />
      <h3>The Basics of Investing</h3>
      <p>10 lessons 4h 15m</p>
    </div>
    <div className="course-card">
      <img src="https://via.placeholder.com/150" alt="The World of Whiskey" />
      <h3>The World of Whiskey</h3>
      <p>6 lessons 2h 50m</p>
    </div>
  </div>
  <div className="view-all-courses ">
    <Button>View more</Button>
  </div>
</div>

   </>
  
)}