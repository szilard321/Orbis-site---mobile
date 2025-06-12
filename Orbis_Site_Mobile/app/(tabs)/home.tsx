import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg'; // sau altă librărie SVG
import { useRouter } from 'expo-router'; // Add this import
import { TouchableOpacity, Linking } from 'react-native';

const HomeScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const router = useRouter();

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  // Calculează lungimea fitilului în funcție de scrollOffset
  const fuseLength = Math.min(scrollOffset / 10, 200); // ajustează 10 și 200 după nevoie

  return (
    <ScrollView ref={scrollViewRef} onScroll={handleScroll} style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/image.png')} style={styles.logo} /> {/* Înlocuiește cu calea către logo */}
        <Text style={styles.title}>ORBIS</Text>
        <View style={styles.buttons}>
          <Button style={styles.button} labelStyle={{ fontSize: 11, color:'white'}}  mode="text" onPress={() => router.push('/about')}>About Us</Button>
          <Button style={styles.button} labelStyle={{ fontSize: 11 , color:'white'}} mode="text" onPress={() => router.push('/about_app')}>The App</Button>
          <Button style={styles.button} labelStyle={{ fontSize: 11 , color:'white'}}  mode="text" onPress={() =>router.push('/contact') }>Contact</Button>
        </View>
      </View>
      <View style={styles.imageContainer}>
  <Image source={require('../../assets/images/trees.jpg')} style={styles.forestImage} />
  
  <View style={styles.overlayContent}>
  
    <Text style={styles.overlayText}>Orbis helps you save the planet!
</Text>

    <View style={styles.downloadButtons}>
  <TouchableOpacity
    style={styles.downloadButton}
    onPress={() => Linking.openURL('https://apps.apple.com/your-app-link')}
    activeOpacity={0.8}
  >
    <Image
      source={require('../../assets/images/app-store-badge.png')}
      style={{ width: 143, height: 43, resizeMode: 'contain' }}
    />
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.downloadButton}
    onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=your.app.id')}
    activeOpacity={0.8}
  >
    <Image
      source={require('../../assets/images/google-play-badge.png')}
      style={{ width: 160, height: 43, resizeMode: 'contain' }}
    />
  </TouchableOpacity>
</View>
  </View>
</View>
      <View style={styles.animationContainer}>
        <Svg height="200" width="50">
          <Path
            d={`M25,${200 - fuseLength} L25,200`}
            fill="none"
            stroke="red"
            strokeWidth="5"
          />
        </Svg>
        {/* Adaugă aici o imagine sau animație pentru flacără */}
      </View>
      {/* Adaugă aici restul conținutului */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F4F44', // Verde închis
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    padding: 30,
  },

  logo: {
    width: 30,
    height: 40,
  },

  title: {
    paddingTop:10,
    marginLeft: 3,
    marginRight: '5%',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  buttons: {
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap-reverse',             
},

  button: {
  minWidth: 80,  
  },

  animationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },  
  imageContainer: {
  position: 'relative',
  width: '100%',
  height: 200,
},

forestImage: {
  width: '100%',
  height: '130%',
  resizeMode: 'cover',
  borderRadius: 0,
},

overlayContent: {
  position: 'absolute',
  bottom: 5,
  width: '100%',
  alignItems: 'center',
  paddingHorizontal: 20,
},

overlayText: {
  color: 'white',
  fontSize: 32,
  marginLeft:'-40%',
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'left',
  maxWidth: '50%', // textul va ocupa max. jumătate din imagine
  flexWrap: 'wrap', // permite textului să meargă pe rând nou
},

downloadButtons: {
  flexDirection: 'row',
  marginBottom: '-5%',
  gap: '5%',
  paddingTop:'2%',
  justifyContent: 'space-around',
  width: '100%',
},

downloadButton: {
  flex: 1,
  marginBottom:'-5%',
  marginHorizontal: 5,
},

});

export default HomeScreen;
