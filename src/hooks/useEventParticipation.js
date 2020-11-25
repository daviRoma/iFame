import { useState, useEffect } from 'react';
import { getHookFilteredEvents } from '../api/FirebaseApi';

export const useEventParticipation = (params) => {
  const [eventsParticipation, setEventsParticipation] = useState([]);
  const [loadEvents, setLoadEvents] = useState(false);

  useEffect(() => {
    if (params && params.participation) {
      // setLoadEvents(true);
      const sub = getHookFilteredEvents(params, (data) =>
        setEventsParticipation(data),
      );
      // setLoadEvents(false);
      return sub;
    } else {
      setEventsParticipation([]);
    }
  }, []);

  return [eventsParticipation, loadEvents];
};
