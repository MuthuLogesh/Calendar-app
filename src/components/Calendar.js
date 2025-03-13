import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, setSelectedEvent } from '../redux/calendarSlice';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
       
        const response = await axios.get('/calendarfromtoenddate.json');
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        dispatch(setEvents(formattedEvents));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [dispatch]);

  const handleSelectEvent = (event) => {
    dispatch(setSelectedEvent(event));
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="h-screen p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        view={currentView}
        date={currentDate}
        style={{ height: '80vh' }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
      />
    </div>
  );
};

export default CalendarComponent;