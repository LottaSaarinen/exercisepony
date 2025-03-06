import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { firestore } from '../App/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from 'firebase/firestore';
import Button from '../../shared/buttons';
import styles from './Calendar.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CalendarApp(props) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({ date: '', description: '' });
  const [notification, setNotification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [locale, setLocale] = useState('en-US');  // or 'en-US' for English

  const auth = getAuth();

  const filteredEvents = events.filter(
    (event) => new Date(event.date).toDateString() === date.toDateString()
  );

  // tileClassName function should be declared above the return statement
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const eventDates = events.map((event) => new Date(event.date).toDateString());
      if (eventDates.includes(date.toDateString())) {
        return styles.eventDay;
      }
      return styles.tile;
    }
    return null;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribeEvents = onSnapshot(
        query(collection(firestore, `user/${user.uid}/calendar`), orderBy('date')),
        (snapshot) => {
          const eventList = [];
          snapshot.forEach((doc) => {
            eventList.push({ ...doc.data(), id: doc.id });
          });
          setEvents(eventList);
        }
      );

      const unsubscribeNotifications = onSnapshot(
        query(collection(firestore, `user/${user.uid}/notifications`), orderBy('date', 'desc')),
        (snapshot) => {
          const notifList = [];
          snapshot.forEach((doc) => {
            notifList.push({ ...doc.data(), id: doc.id });
          });
          setNotifications(notifList);
        }
      );

      return () => {
        unsubscribeEvents();
        unsubscribeNotifications();
      };
    }
  }, [user]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const event = events.find((e) => e.date === newDate.toDateString()) || { date: newDate.toDateString(), description: '' };
    setCurrentEvent(event);
  };

  const handleEventChange = (e) => {
    setCurrentEvent({ ...currentEvent, description: e.target.value });
  };

  const handleEventSave = async () => {
    if (user) {
      if (currentEvent.id) {
        await setDoc(doc(firestore, `user/${user.uid}/calendar`, currentEvent.id), {
          description: currentEvent.description,
        });
      } else {
        await addDoc(collection(firestore, `user/${user.uid}/calendar`), {
          date: currentEvent.date,
          description: currentEvent.description,
        });
      }
      setIsModalOpen(false);
    }
  };

  const handleEventDelete = async () => {
    if (user && currentEvent.id) {
      await deleteDoc(doc(firestore, `user/${user.uid}/calendar`, currentEvent.id));
      setIsModalOpen(false);
    }
  };

  const handleAddNotification = async () => {
    if (notification.trim() !== '' && user) {
      const notificationRef = collection(firestore, `user/${user.uid}/notifications`);
      await addDoc(notificationRef, { notification, date: new Date().toISOString() });
      toast(notification);
      setNotification('');
    }
  };

  const handleNotificationsDelete = async (id) => {
    if (user) {
      await deleteDoc(doc(firestore, `user/${user.uid}/notifications`, id));
    }
  };

  const logout = () => {
    signOut(auth);
  };

  Modal.setAppElement('#root');

  return (
    <div>
      <div className={styles.userbutton}>
        <Button primary onClick={logout}>Log out</Button>
      </div>
      <div className={styles.settings_profile}>
        <div className={styles.settings_user}>
          <div><img src={props.user.photoURL} alt="Profile" /></div>
          <div>{props.user.displayName}<br />{props.user.email}</div>
        </div>
      </div>
  
      <br /><br />
      <div className={styles.calendarContainer}>
        <p><Button onClick={() => setIsModalOpen(true)}>Add</Button></p>
        <p>select a date first</p>
        <p>{currentEvent.date}</p>

        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={tileClassName}
          locale={locale}  // Pass the locale prop here
        />
  
        <p>Selected day events:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li key={event.id} style={{ borderBottom: '1px solid #FADADD', padding: '1px' }}>
                <div><strong>{event.description}</strong></div>
              </li>
            ))
          ) : (
            <li><p></p></li>
          )}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Event Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: '50%',
            bottom: 'auto',
            marginRight: '-54%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h4>{currentEvent.date}</h4>
        <textarea
          value={currentEvent.description}
          onChange={handleEventChange}
          placeholder="✍🏽.."
          rows={17}
          cols={80}
        />
        <br />
        <Button onClick={handleEventSave}>Save</Button>
        <Button onClick={handleEventDelete}>Delete</Button>
        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
      </Modal>
  
      <div style={{ paddingTop: '3em' }}>
        <div className={styles.note}>
          <textarea
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            placeholder="✍🏽..."
            rows={3}
            cols={'auto'}
            className="textarea"
          />
          <div className="button-group">
            <Button onClick={handleAddNotification}>Add</Button>
          </div>
        </div>
  
        <div style={{ paddingTop: '2em', padding: '2em' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {notifications.map((notif) => (
              <li
                key={notif.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <span>{notif.notification}</span>
                <Button onClick={() => handleNotificationsDelete(notif.id)} style={{ marginLeft: '1em' }}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default CalendarApp;
