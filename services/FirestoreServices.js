import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const addReading = async (dayId, readingData) => {
    //Add reading to specific day
    try {
        //1. Specify where we want the data to be added
        const dayRef = doc(db, "days", dayId)

        //2. Specify the subcollection in the document
        const readingRef = collection(dayRef, "readings")

        //3. Add document into this subcollection that we have
        const docRef = await addDoc(readingRef, readingData)

        console.log("Success adding doc with id: " + docRef.id)
        return true
    } catch (e) {
        console.log("Something went wrong adding reading documet: " + e)
        return false
    }

    
} 

export const getAllDays = async () => {

    //1. Specify where we want to get the data from
    const collectionRef = collection(db, "days");

    //2. Specify what we want to do with the collection (getdocs)
    const querySnapshot = await getDocs(collectionRef);

    //3. Process my data to be managable
    var daysData = []  //<-- this is what I want to return

    //4. Loop through each document so we can add it to daysData
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var theDay = {...doc.data(), id: doc.id}
        daysData.push(theDay)
    });

    return daysData
}