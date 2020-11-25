import { useState, useEffect } from 'react';
import { getHookFilteredEvents } from '../api/FirebaseApi';

export const useEventParticipation = (params) => {
  const [eventsParticipation, setEventsParticipation] = useState([]);
  const [loadEvents, setLoadEvents] = useState(false);

  useEffect(() => {
    if (params) {
      setLoadEvents(true);
      getHookFilteredEvents(params).then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setEventsParticipation(data);
        setLoadEvents(false);
      });
    } else {
      setEventsParticipation([]);
    }
  }, []);

  return [eventsParticipation, loadEvents];
};
