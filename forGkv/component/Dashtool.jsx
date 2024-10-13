import React, { useEffect, useRef, useState } from 'react'
import '../Styles/Dashtool.css'

export default function Dashtool(props) {
    function timeAgo(date) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - date.getTime();
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (seconds > 0) {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        } else {
            return 'just now';
        }
    }

    const [tasks, setTasks] = useState([
        { text: 'Short task goes here...', completed: false },
        { text: 'Short task goes here...', completed: false },
        { text: 'Short task goes here...', completed: true },
        { text: 'Short task goes here...', completed: false },
        { text: 'Short task goes here...', completed: false }
    ]);
    const [newTask, setNewTask] = useState("");
    const [getMessage, setgetMessage] = useState([])

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };


    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const calendarRef = useRef();

    useEffect(() => {
        const Getmessage = async () => {
            try {
                const response = await fetch('http://localhost:3000/getContact', {
                    method: "GET"
                });
                const resdata = await response.json();

                if (response.ok) {
                    console.log("Data fetched successfully:", resdata);
                    setgetMessage(resdata.contacts);
                } else {
                    console.error("Error in fetching messages:", resdata);
                }
            } catch (error) {
                console.error("An error occurred while fetching the messages:", error);
            }
        };

        Getmessage();
    }, []);


    console.log(getMessage)

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    const month_names = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    };

    const generateCalendar = (month, year) => {
        const calendarDays = calendarRef.current.querySelector('.calendar-days');
        const calendarHeaderYear = calendarRef.current.querySelector('#year');

        const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        calendarDays.innerHTML = '';

        let currDate = new Date();
        const curr_month = month_names[month];
        calendarHeaderYear.innerHTML = year;

        let first_day = new Date(year, month, 1);

        for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
            const day = document.createElement('div');
            if (i >= first_day.getDay()) {
                day.classList.add('calendar-day-hover');
                day.innerHTML = i - first_day.getDay() + 1;
                day.innerHTML += `<span></span><span></span><span></span><span></span>`;
                if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                    day.classList.add('curr-date');
                }
            }
            calendarDays.appendChild(day);
        }
    };

    const handelShow = () => {
        props.onTabSelect('widgets');
    }

    return (
        <>
            <div className="toolcontainer">
                <div className="litool">
                    <div className="bg">
                        <img src='https://img.icons8.com/?size=100&id=11220&format=png&color=ff0000' />
                        <span> Total User
                            <p>1200</p>
                        </span>
                    </div>
                    <div className="bg">
                        <img src='https://img.icons8.com/?size=100&id=rATNJXukPnNS&format=png&color=ff0000' />
                        <span>Total Participents
                            <p>190</p>
                        </span>
                    </div>
                    <div className="bg">
                        <img src='https://img.icons8.com/?size=100&id=70640&format=png&color=ff0000' /><span>Total Revenue
                            <p>Rs.1400</p>
                        </span>
                    </div>
                </div>
                <div className="widget">
                    <div className="widget3">
                        <div className="container-fluid pt-4 px-4">
                            <div className="row g-4">
                                {/* Messages Widget */}
                                <div className="col-sm-12 msg col-md-6 col-xl-4">
                                    <div className="h-100 bg-secondary rounded p-4">
                                        <div className="d-flex curser align-items-center justify-content-between mb-2">
                                            <h2 className="mb-0">Messages</h2>
                                            <a onClick={handelShow} >Show All</a>
                                        </div>
                                        {getMessage.map((msg, index) => {
                                            return (
                                                <div className="d-flex align-items-center border-bottom py-3" key={index}>
                                                    <div className="w-100 ms-3">
                                                        <div className="d-flex name w-100 justify-content-between">
                                                            <h3 className="mb-0">{msg.name}</h3>
                                                            <small>{timeAgo(new Date(msg.createdAt))}</small>
                                                        </div>
                                                        <span> {msg.subject.split(' ').slice(0, 6).join(' ')}
                                                            {msg.subject.split(' ').length > 6 ? '...' : ''}...</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Calendar Widget */}
                                <div className="col-sm-12 col-md-6 col-xl-4">
                                    <div className="h-100 bg-secondary rounded p-4">
                                        <div className="calendar" ref={calendarRef}>
                                            <div className="calendar-header">
                                                <span className="month-picker" id="month-picker" onClick={() => { /* handle month selection */ }}>{month_names[currentMonth]}</span>
                                                <div className="year-picker">
                                                    <span className="year-change" id="prev-year" onClick={() => setCurrentYear(prev => prev - 1)}><pre>&lt;</pre></span>
                                                    <span id="year">{currentYear}</span>
                                                    <span className="year-change" id="next-year" onClick={() => setCurrentYear(prev => prev + 1)}><pre>&gt;</pre></span>
                                                </div>
                                            </div>
                                            <div className="calendar-body">
                                                <div className="calendar-week-day">
                                                    <div>Sun</div>
                                                    <div>Mon</div>
                                                    <div>Tue</div>
                                                    <div>Wed</div>
                                                    <div>Thu</div>
                                                    <div>Fri</div>
                                                    <div>Sat</div>
                                                </div>
                                                <div className="calendar-days"></div>
                                            </div>
                                            <div className="month-list"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-4 todo">
                    <div className="h-100 bg-secondary rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="mb-0">To Do List</h3>
                            <a href="#">Show All</a>
                        </div>
                        <div className="d-flex mb-2">
                            <input
                                className="form-control bg-dark border-0"
                                type="text"
                                placeholder="Enter task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <button type="button" className="btnx btn-primary ms-2" onClick={handleAddTask}>
                                Add
                            </button>
                        </div>
                        {tasks.map((task, index) => (
                            <div key={index} className="d-flex align-items-center border-bottom py-2">
                                <input
                                    className="form-check-input m-0"
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(index)}
                                />
                                <div className="w-100 ms-3">
                                    <div className="d-flex w-100 Dbtn align-items-center justify-content-between">
                                        <span>{task.completed ? <del>{task.text}</del> : task.text}</span>
                                        <button onClick={() => handleDeleteTask(index)}>
                                            <h3>x</h3>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
