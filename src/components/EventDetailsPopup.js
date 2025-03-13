import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '../redux/calendarSlice';
import axios from 'axios';

const EventDetailsPopup = () => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    if (selectedEvent) {
      const fetchEventDetails = async () => {
        try {
          
          const response = await axios.get('/calendarfromtoenddate.json');
          
          const event = response.data.find((e) => e.id === selectedEvent.id);
          setEventDetails(event);
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      };
      fetchEventDetails();
    }
  }, [selectedEvent]);

  const handleClose = () => {
    dispatch(setSelectedEvent(null));
    setEventDetails(null);
  };

  if (!selectedEvent || !eventDetails) return null;

  return (
    <Dialog open={!!selectedEvent} onClose={handleClose}>
      <DialogTitle>{eventDetails.title}</DialogTitle>
      <DialogContent>
        <p>{eventDetails.description}</p>
        <p>Start: {new Date(eventDetails.start).toLocaleString()}</p>
        <p>End: {new Date(eventDetails.end).toLocaleString()}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={() => window.open(eventDetails.meetingLink, '_blank')}>
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsPopup;