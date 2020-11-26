import { useState, useEffect } from 'react';
import { getHookFilteredEvents } from '../api/FirebaseApi';

export const useEventParticipation = (params) => {
  const [eventsParticipation, setEventsParticipation] = useState([]);
  const [loadEvents, setLoadEvents] = useState(false);

  useEffect(() => {
    if (params && params.participation) {
      const sub = getHookFilteredEvents(params, (data) =>
        setEventsParticipation(data),
      );
      return sub;
    } else {
      setEventsParticipation([]);
    }
  }, []);

  return [eventsParticipation, loadEvents];
};
