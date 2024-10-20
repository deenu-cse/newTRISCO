import React, { useEffect, useState } from "react";
import '../Styles/Event.css'
import { NavLink } from "react-router-dom";
import popular from '../../img/popular.png'


const Schedule = () => {
    const [activeDay, setActiveDay] = useState("");
    const [shedule, setshedule] = useState([]);
    const [days, setDays] = useState([]);
    const [popularEvent, setPopularEvent] = useState(null);


    console.log(popularEvent)


    const handleDayClick = (day) => {
        setActiveDay(day);
    };

    useEffect(() => {
        const getPopularEvent = async () => {
            try {
                const response = await fetch('http://localhost:3000/popularEvent',
                    { method: 'GET' });
                const resdata = await response.json();
                if (response.ok) {
                    setPopularEvent(resdata.popularEvent);
                }
            } catch (error) {
                console.log('Error fetching popular event:', error);
            }
        };

        getPopularEvent();
    }, []);

    useEffect(() => {
        const getShedule = async () => {
            try {
                const response = await fetch('http://localhost:3000/getShedule', {
                    method: "GET"
                });
                if (response.ok) {
                    const resdata = await response.json();
                    setshedule(resdata);

                    const uniqueDays = [...new Set(resdata.map(item => item.day))];
                    setDays(uniqueDays);

                    if (uniqueDays.length > 0) {
                        setActiveDay(uniqueDays[0]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getShedule();
    }, []);

    const filterScheduleByDay = (day) => {
        return shedule.filter(item => item.day === day);
    };

    return (
        <section id="schedule" className="section-with-bg">
            <div className="container wow fadeInUp">
                <div className="section-header">
                    <h2>Event Schedule</h2>
                    <p>Here is our event schedule</p>
                </div>

                <ul className="navv nav-tabs" role="tablist">
                    {days.map((day, index) => (
                        <li className="nav-item" key={index}>
                            <button
                                className={`nav-link ${activeDay === day ? "active" : ""}`}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="tab-content row justify-content-center">
                    {filterScheduleByDay(activeDay).map((item) => (
                        <div className="col-lg-9 tab-pane fade show active pop">
                            <NavLink to={`/AboutEventshedule/${item.name}`}>
                                <ScheduleItem
                                    key={item._id}
                                    time={item.time}
                                    title={item.name}
                                    description={
                                        `${item.description.split(' ').slice(0, 6).join(' ')}${item.description.split(' ').length > 6 ? '...' : ''}`
                                    }
                                />
                            </NavLink>
                            <div className="popular">
                                {item.name == popularEvent &&
                                    <img loading='lazy' src={popular} />
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ScheduleItem = ({ time, title, speaker, description, speakerImage }) => (
    <div className="row schedule-item">
        <div className="col-md-2 color">
            <time>{time}</time>
        </div>
        <div className="col-md-10 color">
            <h4>
                {title} {speaker && <span>{speaker}</span>}
            </h4>
            <p>{description}</p>
        </div>
    </div>
);

export default Schedule;
