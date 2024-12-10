import {View, StyleSheet, Text, TextInput, Button, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const windowWidth : number = Dimensions.get('window').width;
const windowHeight : number = Dimensions.get('window').height;

export default function HomeScreen() {
  const [text, changeText] = useState('');
  const [username, changeUsername] = useState('');
  
  return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.title}>
          <View style={styles.subtitle}>
            <View style={styles.imageContainer}>
              {/* <Image style={styles.image} source={require('../assets/images/gonow-no-bg.png')}/> */}
            </View>
            <Text style={styles.titleText}>GONOW</Text>
          </View>
          <Text>GPS-Optimized Notifier and Organizer for Work</Text>
        </View>
          

        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeUsername}
          value={username}
        />

        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeText}
          value={text}
        />

        <Button
        title='submit'
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center' 
  },

  title: {
    flex: 1/6,
    alignItems:'center'
  },

  subtitle:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center'
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  input: {
    borderWidth:1,
    width: windowWidth / 1.5,
    margin: 4,
    marginBottom:10,
    borderRadius: 24
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  image:{
    width:windowWidth/7,
    height:windowHeight/14,
    resizeMode: 'cover'
  }
});
