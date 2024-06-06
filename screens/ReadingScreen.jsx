import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReadingCard from './ReadingCard'
import { getAllDays } from '../services/FirestoreServices'

const ReadingScreen = ({navigation}) => {

  // TODO: Get all Days
  var dummyReading = {name: "Monday", icon: "sun", id: "123456789"}

  const [days, setDays] = useState([])

  const handleGettingDays = async () => {
    var daysData = await getAllDays()
    setDays(daysData)
  }

  useEffect(() => {
    handleGettingDays()
  }, [])

  return (
    <View style={styles.container}>
      <Button title='Add Reading' onPress={() => navigation.navigate("Add")} />

      {/* Get all the days and display them here using the reading card (doesnt include the readings data) */}
      {days != [] ? (
        days.map((day) => (
          <ReadingCard day={day} key={day.id} />
        ))
      ): null}
      

    </View>
  )
}

export default ReadingScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})