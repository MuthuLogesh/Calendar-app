import React from 'react';
import CalendarComponent from './components/Calendar';
import EventDetailsPopup from './components/EventDetailsPopup';

  function App() {
    return (
      <div className="App">
        <CalendarComponent />
        <EventDetailsPopup />
      </div>
    );
  }

  export default App;