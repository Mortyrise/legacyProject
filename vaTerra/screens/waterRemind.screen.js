import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IntervalSliders from '../components/IntervalSliders';
import { getUser } from '../utils/service';

function WaterRemind() {
  const [plants, setPlants] = useState([]);

  const getData = async () => {
    try {
      const data = await getUser(1);
      console.log('getData', data);
      //could be undefined if no plants
      if (data.plantsArray) {
        setPlants(data.plantsArray);
      }
    } catch (error) {
      console.log('Error waterRemid', error);
    }
  };

  useEffect(() => {
    getData();
    // console.log('fetching data');
  }, []);
  return (
    <View style={styles.slidersContainer}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Watering Reminders</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        {plants.map((plant, index) => (
          <View>
            <Text key={index} style={styles.text}>
              {' '}
              {plant.latin}
            </Text>
            <IntervalSliders plant={plant} key={index * 10} />
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  slidersContainer: {
    marginTop: 90,
    flex: 1,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#009c97',
    letterSpacing: 6,
  },
});
export default WaterRemind;
