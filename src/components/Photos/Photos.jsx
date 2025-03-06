import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../../shared/buttons';
import { firestore } from '../App/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import { readAndCompressImage } from 'browser-image-resizer';


const resizeConfig = {
  quality: 0.7, 
  maxWidth: 1500, 
  maxHeight: 1500, 
  autoRotate: true, 
};

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState([]);
  const auth = getAuth();


  useEffect(() => {
    const fetchUserData = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchUserData();
  }, [auth]);

  // Hakee ja näyttää kuvat Firebase-tietokannasta
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(firestore, `user/${user.uid}/photos`), orderBy('date', 'desc'),
       ),(snapshot) => {
          const photosList = [];
          snapshot.forEach((doc) => {
            photosList.push({ ...doc.data(), id: doc.id });
          });
          setPhotos(photosList); // Päivitä koko lista suoraan
      }
    );
    return () => unsubscribe();
  }
 
         
  }, [user]);

  // Käsittelee kuvan pudotuksen ja lataa sen Firebaseen
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      console.log("Hyväksytyt tiedostot: ", acceptedFiles);
      acceptedFiles.forEach(async (file) => {
        try {
          // Pienennetään kuva
          const resizedImage = await readAndCompressImage(file, resizeConfig);
          // Muutetaan kuva Base64-muotoon
          const base64 = await convertToBase64(resizedImage);

          // Ladataan kuva Firebaseen
          if (user) {
            const docRef = doc(firestore, `user/${user.uid}/photos`, file.name);
            await setDoc(docRef, {
              base64: base64,
              date: new Date(),
            });

            // Päivitetään kuvat tilassa vain, jos kuvaa ei ole jo olemassa
            setPhotos((prevPhotos) => {
              const existingPhotos = prevPhotos.map((photo) => photo.name); // Otetaan olemassa olevat kuvat
              if (!existingPhotos.includes(file.name)) {
                return [...prevPhotos, { name: file.name, base64: base64, date: new Date() }];
              }
              return prevPhotos; // Ei lisätä kuvaa, jos se on jo olemassa
            });
          }
        } catch (error) {
          console.error("Too big picture", error);
        }
      });
    },
    accept: 'image/*', // Hyväksytään vain kuvatiedostot
  });
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const handleRemovePhoto = async (photoId) => {
    if (user) {
      const docRef = doc(firestore, `user/${user.uid}/photos`, photoId);
      await deleteDoc(docRef);

      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px' }}>
        <input {...getInputProps()} accept="image/*" />
        <p>Drag and drop images here or select a file.</p>
      </div>

      <div>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                padding: '1em',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={photo.base64}
                alt={`uploaded-img-${photo.id}`}
                style={{
                  maxWidth: '100%', 
                  height: 'auto',   
                
                  maxHeight: '80vh', 
                }}
              />
              <Button onClick={() => handleRemovePhoto(photo.id)} style={{ marginTop: '1em' }}>
                <p>Delete picture</p>
              </Button>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Photos;
