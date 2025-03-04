import React, { useState, useEffect } from 'react';
import { firestore } from '../App/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';
import Button from '../../shared/buttons';
import styles from './Shoe.module.scss';

function Shoe() {
  const [shoe, setShoe] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [shoeHistory, setShoeHistory] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, `user/${user?.uid}/shoe`), orderBy('date', 'desc')),  
      snapshot => {
        const newShoeList = [];
        snapshot.forEach(doc => {
          newShoeList.push({ ...doc.data(), id: doc.id });
        });
        setShoe(newShoeList);  
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
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(firestore, `user/${user?.uid}/shoeHistory`), orderBy('date', 'desc')),
        snapshot => {
          const newHistory = [];
          snapshot.forEach(doc => {
            newHistory.push(doc.data());
          });
          setShoeHistory(newHistory);
        }
      );
      return unsubscribe;
    }
  }, [user]);

  const handleAddShoe = async (e) => {
    e.preventDefault();
    const newShoe = { date, description };

    if (isEditing) {
     
      const shoeDocRef = doc(firestore, `user/${user.uid}/shoe`, shoe[editIndex].id);
      await updateDoc(shoeDocRef, { date, description });  
      const updatedShoe = shoe.map((shoeItem, index) =>
        index === editIndex ? newShoe : shoeItem
      );
      setShoe(updatedShoe);
      setIsEditing(false);
      setEditIndex(null);
    } else {
     
      await addDoc(collection(firestore, `user/${user.uid}/shoe`), { date, description });
      setShoe([newShoe, ...shoe]); 
    }

    const newHistoryEntry = { date, description };
    await addDoc(collection(firestore, `user/${user.uid}/shoeHistory`), newHistoryEntry);

    setDate('');
    setDescription('');
  };

  const handleEditShoe = (index) => {
    const shoeItem = shoe[index];
    setDate(shoeItem.date);
    setDescription(shoeItem.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteShoe = async (index) => {
    const updatedShoe = shoe.filter((_, i) => i !== index);
    setShoe(updatedShoe);
    setIsEditing(false);
    setEditIndex(null);

    if (user) {
      await deleteDoc(doc(firestore, `user/${user.uid}/shoe`, shoe[index].id));
    }
  };

  return (
    <div className={styles.tekstilaatikko} style={{ padding: '2em', maxWidth: '38em' }}>
      <h2>Kengitykset ja lihashuolto</h2>
      
      <form onSubmit={handleAddShoe}>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              borderRadius: '10px',
              border: '1px solid #ccc',
              width: 'auto',
              padding: '0.5em',
              marginBottom: '0.5em'
            }}
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="lisätiedot✍🏽"
            rows="3"
            cols="auto"
            style={{
              width: '100%',
              padding: '0.5em',
              borderRadius: '10px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <Button type="submit">
          Lisää
        </Button>
      </form>

      <div style={{ marginTop: '2em' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {shoe.map((shoeItem, index) => (
            <li
              key={shoeItem.id}
              style={{
                justifyContent: 'space-between',
                padding: '1em 0',
                borderBottom: '1px solid #ddd',
                width: '100%',
                maxWidth: '38em',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <span>{shoeItem.date}</span><br />
                <span>{shoeItem.description}</span>
              </div>
              <div style={{ display: 'flex', gap: '1em' }}>
                <Button onClick={() => handleEditShoe(index)}>Muokkaa</Button>
                {isEditing && editIndex === index && (
                  <Button onClick={() => handleDeleteShoe(index)}>Poista</Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Shoe;
