import React from 'react'
import app from '../firebase/config';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import useFileShare from './useFileShare';

function useStorage() {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    const { getDownloadLink } = useFileShare();

    const listFiles = async ({
        type,
        course,
        semester
    }) => {
        const q = query(collection(db, "files"),
            where("type", "==", type),
            where("course", "==", course),
            where("semester", "==", semester)
        )

        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    }

    const loadFile = async (data) => {
        if (data.StoredInDB) {
            const url = await getDownloadLink(data.url);

            return {
                url,
                title: data.title
            };
        }

        return {
            url: data.url,
            title: data.title
        }
    }


    return {
        listFiles,
        loadFile
    }
}

export default useStorage