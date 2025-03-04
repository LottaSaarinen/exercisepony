import { useState, useEffect } from 'react';
import useLocalStorage from '../../shared/useLocalStorage/useLocalStorage'; 
import AppRouter from '../AppRouter'; 
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import firebase, { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Startup from '../Startup';

function App() {
  const [data, setData] = useState([]);  
  const [typelist, setTypelist] = useState([]);  
  const [user, setUser] = useState();  
  const [foodlist, setFoodlist] = useState([]);  
  const [shoelist, setShoelist] = useState([]);  
  const [competitionList, setCompetitionList] = useState([]);  
  const [vetList, setVetList] = useState([]);  
  const [calendarList, setCalendarList] = useState([]);  
  const [notificationsList, setNotificationsList] = useState([]); 
  const [photosList, setPhotosList] = useState([]);
  const [note, setNote] = useState('');
  const firestore = getFirestore(firebase);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(query(
        collection(firestore, `user/${user.uid}/item`), 
        orderBy('exerciseDate', 'desc') 
      ), snapshot => {
        const newData = [];
        snapshot.forEach(doc => {
          newData.push({ ...doc.data(), id: doc.id });  
        });
        setData(newData); 
      });
      return unsubscribe;
    } else {
      setData([]); 
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(query(
        collection(firestore, `user/${user.uid}/type`),
        orderBy('type') 
      ), snapshot => {
        const newTypelist = [];
        snapshot.forEach(doc => {
          newTypelist.push(doc.data().type);  
        });
        setTypelist(newTypelist); 
      });
      return unsubscribe;
    } else {
      setTypelist([]); 
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(firestore, `user/${user?.uid}/food`),
      orderBy('food') 
    ), snapshot => {
      const newFoodlist = [];
      snapshot.forEach(doc => {
        newFoodlist.push(doc.data().food);  
      });
      setFoodlist(newFoodlist); 
    });
    return unsubscribe; 
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(firestore, `user/${user?.uid}/shoe`),
      orderBy('date') 
    ), snapshot => {
      const newShoelist = [];
      snapshot.forEach(doc => {
        newShoelist.push(doc.data().shoe);  
      });
      setShoelist(newShoelist); 
    });
    return unsubscribe; 
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(firestore, `user/${user?.uid}/competition`),
      orderBy('competitionDate') 
    ), snapshot => {
      const newCompetitionList = [];
      snapshot.forEach(doc => {
        newCompetitionList.push(doc.data().competition);  
      });
      setCompetitionList(newCompetitionList); 
    });
    return unsubscribe; 
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(firestore, `user/${user?.uid}/vet`),  
      orderBy('date', 'desc')
    ), snapshot => {
      const newVetList = [];
      snapshot.forEach(doc => {
        newVetList.push({ ...doc.data(), id: doc.id });
      });
      setVetList(newVetList);  
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(firestore, `user/${user?.uid}/calendar`),  
      orderBy('date', 'desc')
    ), snapshot => {
      const newCalendarList = [];
      snapshot.forEach(doc => {
        newCalendarList.push({ ...doc.data(), id: doc.id });
      });
      setCalendarList(newCalendarList);  
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(firestore, `user/${user?.uid}/notifications`), 
      orderBy('date', 'desc')
    ), snapshot => {
      const newNotificationsList = [];
      snapshot.forEach(doc => {
        newNotificationsList.push({ ...doc.data(), id: doc.id });
      });
      setNotificationsList(newNotificationsList);  
    });
    return unsubscribe;
  }, [user]);
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(query(
        collection(firestore,  `user/${user?.uid}/photos`), 
        orderBy('date', 'desc')
      ), snapshot => {
        const newPhotosList = [];
        snapshot.forEach(doc => {
          newPhotosList.push({ ...doc.data(), id: doc.id });
        });
        setPhotosList(newPhotosList);  
      });
      return unsubscribe;
    } else {
      setPhotosList([]); 
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(firestore, `user/${user.uid}/note`, 'noteDocument'), (docSnapshot) => {
        if (docSnapshot.exists()) {
          setNote(docSnapshot.data().note || '');  
        }
      });
      return unsubscribe;
    } else {
      setNote('');
    }
  }, [user]);


 

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user); 
    });
  }, []);

  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, `user/${user.uid}/item`, id)); 
  };

  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, `user/${user.uid}/item`, newitem.id), newitem);  
  };

  const handleTypeSubmit = async (type) => {
    await addDoc(collection(firestore, `user/${user.uid}/type`), { type: type });  
  };

  const handleFoodSubmit = async (food) => {
    await addDoc(collection(firestore, `user/${user.uid}/food`), { food: food });  
  };

  const handleShoeSubmit = async (shoe) => {
    await addDoc(collection(firestore, `user/${user.uid}/shoe`), { shoe: shoe });  
  };

  const handleCompetitionSubmit = async (competition) => {
    await addDoc(collection(firestore, `user/${user.uid}/competition`), { competition: competition });  
  };

  const handleVetSubmit = async (vet) => {  
    await addDoc(collection(firestore, `user/${user.uid}/vet`), vet);  
  };

  const handleCalendarSubmit = async (calendar) => { 
    await addDoc(collection(firestore, `user/${user.uid}/calendar`), calendar);  
  };

  const handleNotificationsSubmit = async (notifications) => {  
    await addDoc(collection(firestore, `user/${user.uid}/notifications`), notifications);  
  };
  const handleNotificationsDelete = async (id) => {
    await deleteDoc(doc(firestore, `user/${user.uid}/notifications`, id)); 
  };
  const handlePhotosSubmit = async (photo) => {  
    await addDoc(collection(firestore,  `user/${user.uid}/photos`), photos);  
  };
  const handlePhotosDelete = async (id) => {  
    await deleteDoc(doc(firestore,  `user/${user.uid}/photos`), photos);  
  };

  const handleNoteSubmit = async () => {
    if (user) {
      const noteData = { note }; 
      await setDoc(doc(firestore, `user/${user.uid}/note`, 'noteDocument'), noteData);
    }
  };

  return (
    <>
      {user ? 
        <AppRouter 
          data={data} 
          typelist={typelist} 
          foodlist={foodlist} 
          shoelist={shoelist}  
          competitionList={competitionList} 
          vetList={vetList}  
          calendarList={calendarList}  
          notificationsList={notificationsList}
          photosList={photosList} 
          note={note}
          handleNoteSubmit={handleNoteSubmit}
          onPhotosSubmit={handlePhotosSubmit}  
          onPhotosDelete={handlePhotosDelete} 
          onItemSubmit={handleItemSubmit} 
          onItemDelete={handleItemDelete} 
          onTypeSubmit={handleTypeSubmit} 
          onFoodSubmit={handleFoodSubmit} 
          onShoeSubmit={handleShoeSubmit}  
          onCompetitionSubmit={handleCompetitionSubmit}  
          onVetSubmit={handleVetSubmit} 
          onCalendarSubmit={handleCalendarSubmit}  
          onNotificationsSubmit={handleNotificationsSubmit}  
          onNotificationsDelete={handleNotificationsDelete} 
          auth={auth} 
          user={user} />
        : 
        <Startup auth={auth} />
      }
    </>
  );
}

export default App;
