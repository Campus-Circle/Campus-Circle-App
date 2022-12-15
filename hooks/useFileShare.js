import React, { useCallback } from 'react';
import app from '../firebase/config';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


function useFileShare() {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    /*
    {
    "title": "Add a Text File",
    "url": "",
    "file": {
        "0": {}
    },
    "type": "Notes",
    "course": "ECE",
    "semester": 5
}
    */
    const uploadStorage = useCallback(async (data) => {
        const storageRef = ref(storage, `${data.type}`);

        const fileRef = ref(storageRef, uuidv4());
        try {
            let filePath = "";
            let response;
            if (data.file.length === 0) {
                if (data.url === "")
                    throw new Error("Please select a file");

                filePath = data.url;
            } else {

                console.log(fileRef);

                response = await uploadBytes(fileRef, data.file[0]);
                filePath = response.metadata.fullPath;
            }

            const docRef = await addDoc(collection(db, "files"), {
                title: data.title,
                url: filePath,
                StoredInDB: response ? true : false,
                type: data.type,
                course: data.course,
                semester: data.semester,
                uid: auth.currentUser.uid,
                umail: auth.currentUser.email,
                createdAt: new Date()

            });
            return {
                title: data.title,
                url: filePath,
                status: 1
            };
        } catch (error) {
            console.error(error);
            return {
                title: data.title,
                error: error.message,
                url: "",
                status: 0
            };
        }
    }, [storage, db, auth]);

    const getDownloadLink = useCallback(async (url) => {
        const fileRef = ref(storage, url);
        try {
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error(error);
            return "";
        }
    }, [
        storage,
        db,
        auth,
    ])

    return { uploadStorage, getDownloadLink };
}

export default useFileShare;