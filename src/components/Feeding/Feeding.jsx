import React, { useState, useEffect } from "react"; 
import Button from '../../shared/buttons';
import { firestore } from '../App/firebase'; 
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 

function Notebook() {
  const [food, setFood] = useState("");  
  const [isEditing, setIsEditing] = useState(false);  
  const [user, setUser] = useState(null);  
  const auth = getAuth();

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

  
  useEffect(() => {
    if (user) {
      const fetchFood = async () => {
        const docRef = doc(firestore, `user/${user.uid}/food`, 'foodData');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFood(docSnap.data().food || "");  
        }
      };
      fetchFood();
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);  
  };

  const handleSaveClick = async () => {
    if (user) {
      
      await setDoc(doc(firestore, `user/${user.uid}/food`, 'foodData'), { food: food });
      setIsEditing(false); 
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Ruokinta ja lisärehut</h2>
      <br></br>
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={food}
          onChange={(e) => setFood(e.target.value)} 
            style={{
            width: '100%',
            height: '70vh',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '10px',
            borderWidth: '10px',
            border: isEditing ? '2px solid rgb(175, 76, 135)' : '2px solid #ccc',
            resize: 'vertical',
          }}
          readOnly={!isEditing}  
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        {isEditing ? (
          <Button 
            onClick={handleSaveClick} 
            style={{ padding: '10px 20px', backgroundColor: 'rgb(175, 76, 135)', color: '#FADADD', borderRadius: '5px', cursor: 'pointer' }}
          >
            Tallenna ruokinnan muutokset
          </Button>
        ) : (
          <Button 
            onClick={handleEditClick} 
            style={{ padding: '10px 20px', backgroundColor: '#f0ss43', color: 'grey', borderRadius: '5px', cursor: 'pointer' }}
          >
            Muokkaa ruokintaa
          </Button>
        )}
      </div>
    </div>
  );
}

export default Notebook;

