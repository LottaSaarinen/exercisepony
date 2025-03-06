import React, { useState, useEffect } from 'react';
import Button from '../../shared/buttons';
import styles from './Vet.module.scss';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from "firebase/firestore";
import firebaseApp from '../App/firebase';

function Vet() {
  const [note, setNote] = useState("");  
  const [isEditingNote, setIsEditingNote] = useState(false);  
  const [vets, setVets] = useState([]);  
  const [date, setDate] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [isEditing, setIsEditing] = useState(false);  
  const [editIndex, setEditIndex] = useState(null);  
  const [user, setUser] = useState(null);  

  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(query(
        collection(firestore, `user/${user.uid}/vet`),
        orderBy('date', 'desc')
      ), snapshot => {
        const newVets = [];
        snapshot.forEach(doc => {
          newVets.push({ ...doc.data(), id: doc.id });
        });
        setVets(newVets);
      });
      return unsubscribe;
    }
  }, [user, firestore]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(firestore, `user/${user.uid}/note`, "noteDocument"), (docSnapshot) => {
        if (docSnapshot.exists()) {
          setNote(docSnapshot.data().note); 
        }
      });
      return unsubscribe;
    }
  }, [user, firestore]);

  const handleAddVet = (e) => {
    e.preventDefault();
    const newVet = { date, description };
    if (isEditing) {
      const updatedVets = vets.map((vet, index) =>
        index === editIndex ? newVet : vet
      );
      setVets(updatedVets);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      addDoc(collection(firestore, `user/${user.uid}/vet`), newVet);
    }
    setDate('');
    setDescription('');
  };

  const handleEditVet = (index) => {
    const vet = vets[index];
    setDate(vet.date);
    setDescription(vet.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteVet = (index) => {
    const vetId = vets[index].id;
    deleteDoc(doc(firestore, `user/${user.uid}/vet`, vetId));
    const updatedVets = vets.filter((_, vetIndex) => vetIndex !== index);
    setVets(updatedVets);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleNoteSubmit = async () => {
    if (user) {
      const noteData = { note };  
      await setDoc(doc(firestore, `user/${user.uid}/note`, "noteDocument"), noteData);  // Tallenna Firestoreen
      setIsEditingNote(false);  
    }
  };

  return (
    <div className={styles.container}>
      <h2>Vet and health</h2>
      <br />
      
      <div className={styles.noteContainer}>
      
    
        medication, morning temperature ✍🏽
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}  
          rows="3"
          cols="60"
          readOnly={!isEditingNote} 
        />
          {isEditingNote ? (
          <Button onClick={handleNoteSubmit}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditingNote(true)}>Update</Button>
        )}
      </div>

      Save notes

      <form onSubmit={handleAddVet} className={styles.form}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="1.2"
          cols="60"
          className={styles.textarea}
        />
        <Button type="submit" className={styles.submitButton}>Add</Button>
      </form>

      <div className={styles.vetList}>
        {vets.map((vet, index) => (
          <div key={vet.id} className={styles.vetItem}>
          
            <div className={styles.vetDetails}>
              {vet.date}: -
              {vet.description}
            </div>

            <Button onClick={() => handleEditVet(index)} className={styles.editButton}>Update</Button>
            {isEditing && editIndex === index && (
              <Button onClick={() => handleDeleteVet(index)} className={styles.deleteButton}>Update/Delete</Button>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vet;
