import React, { useState, useEffect } from 'react';
import { firestore } from '../App/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import Button from '../../shared/buttons';
import styles from './Competition.module.scss';

function Competition() {
  const [competitions, setCompetitions] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [competitionHistory, setCompetitionHistory] = useState([]);
  const [locale, setLocale] = useState('en-US'); 
  const auth = getAuth();
  const formattedDate = new Date().toLocaleDateString(locale);  // Näyttää päivämäärän valitussa kielessä

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, `user/${user?.uid}/competition`), orderBy('date', 'desc')),  
      snapshot => {
        const newCompetitionList = [];
        snapshot.forEach(doc => {
          newCompetitionList.push({ ...doc.data(), id: doc.id });
        });
        setCompetitions(newCompetitionList);
      }
    );
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, `user/${user?.uid}/competitionHistory`), orderBy('date', 'desc')),
      snapshot => {
        const newHistory = [];
        snapshot.forEach(doc => {
          newHistory.push(doc.data());
        });
        setCompetitionHistory(newHistory);
      }
    );
    return unsubscribe;
  }, [user]);

  const handleAddCompetition = async (e) => {
    e.preventDefault();
    const newCompetition = { date, description };

    if (isEditing) {
      const updatedCompetitions = competitions.map((competitionItem, index) =>
        index === editIndex ? newCompetition : competitionItem
      );
      setCompetitions(updatedCompetitions);
      setIsEditing(false);
      setEditIndex(null);
      await deleteDoc(doc(firestore, `user/${user.uid}/competition`, competitions[editIndex].id)); 
    } else {
     
      await addDoc(collection(firestore, `user/${user.uid}/competition`), { date, description });
      setCompetitions([newCompetition, ...competitions]); 
    }

    const newHistoryEntry = { date, description };
    await addDoc(collection(firestore, `user/${user.uid}/competitionHistory`), newHistoryEntry);

    setDate('');
    setDescription('');
  };

  const handleEditCompetition = (index) => {
    const competitionItem = competitions[index];
    setDate(competitionItem.date);
    setDescription(competitionItem.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteCompetition = async (index) => {
    const updatedCompetitions = competitions.filter((_, i) => i !== index);
    setCompetitions(updatedCompetitions);
    setIsEditing(false);
    setEditIndex(null);

    if (user) {
      await deleteDoc(doc(firestore, `user/${user.uid}/competition`, competitions[index].id));
    }
  };

  return (
    <div className={styles.tekstilaatikko} style={{ padding: '2em', maxWidth: '38em' }}>
      <h2>Competition</h2>
      <form onSubmit={handleAddCompetition} style={{ marginBottom: '2em' }}>
        <div>
          <input
            type="date"
            locale={locale} 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              borderRadius: '10px',
              border: '1px solid #ccc',
              padding: '0.5em',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <textarea
            placeholder="Results, comments✍🏽."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            cols="60"
            style={{
              borderRadius: '10px',
              border: '1px solid #ccc',
              padding: '0.5em',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <Button type="submit" style={{ marginTop: '1em' }}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </form>

      <div style={{ marginTop: '2em' }}>
   
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {competitionHistory.map((historyItem, index) => (
            <li
              key={index}
              style={{
                justifyContent: 'space-between',
                padding: '1em 0',
                borderBottom: '1px solid #ddd',
                width: '100%',
                maxWidth: '38em',
                boxSizing: 'border-box',
              }}
            >
              <span>{historyItem.date}</span><br />
              <span>{historyItem.description}</span>
            </li>
          ))}
        </ul>

      
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {competitions.map((competitionItem, index) => (
            <li
              key={competitionItem.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
               
                borderBottom: '1px solid #ddd',
                width: '100%',
                boxSizing: 'border-box',
                paddingLeft: '0.5em',
                paddingRight: '0.5em',
              }}
            >
              <div>
                <span>{competitionItem.date}</span><br />
                <span>{competitionItem.description}</span>
              </div>

              <div style={{ display: 'flex', gap: '1em' }}>
                <Button onClick={() => handleEditCompetition(index)}>Update</Button>
                {isEditing && editIndex === index && (
                  <Button onClick={() => handleDeleteCompetition(index)}>Update/Delete</Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Competition;
