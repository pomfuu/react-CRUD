import React, {useState} from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function Write() {
    let [title, setTitle] = useState("");

    const saveData = async () => {
        const db = getDatabase(app)
        const newDocRef = push(ref(db, "prod"))
        set(newDocRef, {
            title: title,
        }).then(() => {
            alert("data saved")
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
    <div>
        <input type='text' value={title}
         onChange={(e) => setTitle(e.target.value)}        
        />

        <button onClick={saveData}>SAVE DATA</button>
    </div>
  )
}

export default Write