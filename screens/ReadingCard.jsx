import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from '../firebase';


const ReadingCard = (props) => {

  // TODO: Setup Realtime Listening for the specific day's readings
  const { day } = props

  var dummyReadings = [
      {id: "1", temp: 16, time: "12:00"},
      {id: "2", temp: 14, time: "9:00"},
      {id: "3", temp: 12, time: "6:00"}
  ]

  const [readings, setReadings] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      console.log("In view...so do something...")

      //1. specify where we want the data to be added
      const dayRef = doc(db, "days", day.id) //specific doc's ID

      //2. specify the subcollection in this document
      const readingRef = collection(dayRef, "readings")

      const unsubscribe = onSnapshot(readingRef, (querySnapshot) => {

        const readingData = [];

        querySnapshot.forEach((doc) => {
          readingData.push(doc.data());
          console.log("Current readings", doc.data());
        });

        setReadings(readingData)

      });

      return () => {
        //cleanup functions go here
        console.log("out of view...");
        unsubscribe() //this stops listening for data changes
      };
    }, [])
  );

  

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Feather name={day.icon} size={28} color="black" />
        {"  " + day.name + "  "}
        <Feather name={day.icon} size={28} color="black" />
      </Text>

      <View style={styles.readingsBlock}>
        {readings != [] ? (
          readings.map((item) => (
            <View style={styles.readingBubble} key={item.id}>
                <Text style={styles.readingText}>{item.temp}</Text>
            </View>
          ))
        ): <Text>No Readings Yet</Text>}
      </View>
      
    </View>
  )
}

export default ReadingCard

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold'
    },
    readingsBlock: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 20
    },
    readingBubble: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    readingText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})