import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Platform,Animated } from 'react-native';
import { Button } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg'; // sau altă librărie SVG
import { useRouter } from 'expo-router'; // Add this import
import { TouchableOpacity, Linking } from 'react-native';

//de aici incepe animatia fitilului
const AnimatedFlame = ({ scrollOffset }: { scrollOffset: number }) => {
  // Map scrollOffset to a value between 0 and 1
  const t = Math.min(Math.max(scrollOffset / 600, 0), 1);

  // Parametric equation for the fuse path (same as SVG)
  // d="M100,0 Q120,80 80,160 Q100,220 100,300"
  // We'll approximate the path for the flame position

  const width = 220;
const height = 800;

const points = [
  { x: 0.15 * width, y: 0.10 * height }, // Bula 1
  { x: 0.65 * width, y: 0.28 * height }, // Bula 2
  { x: 0.10 * width, y: 0.52 * height }, // Bula 3
  { x: 0.55 * width, y: 0.75 * height }, // Bula 4
  { x: 0.6 * width,  y: 0.9 * height },  // Bombă
];
const getFlamePosition = (t: number) => {
  // Împarte t în 4 segmente (pentru 4 bule)
  if (t < 0.25) {
    const tt = t / 0.25;
    // Bezier între punctele 0 și 1
    const c = { x: points[0].x + 40, y: points[0].y + 60 };
    const x = (1-tt)*(1-tt)*points[0].x + 2*(1-tt)*tt*c.x + tt*tt*points[1].x;
    const y = (1-tt)*(1-tt)*points[0].y + 2*(1-tt)*tt*c.y + tt*tt*points[1].y;
    return { left: x - 16, top: y - 16 };
  } else if (t < 0.5) {
    const tt = (t-0.25)/0.25;
    const c = { x: points[1].x - 60, y: points[1].y + 100 };
    const x = (1-tt)*(1-tt)*points[1].x + 2*(1-tt)*tt*c.x + tt*tt*points[2].x;
    const y = (1-tt)*(1-tt)*points[1].y + 2*(1-tt)*tt*c.y + tt*tt*points[2].y;
    return { left: x - 16, top: y - 16 };
  } else if (t < 0.75) {
    const tt = (t-0.5)/0.25;
    const c = { x: points[2].x + 80, y: points[2].y + 120 };
    const x = (1-tt)*(1-tt)*points[2].x + 2*(1-tt)*tt*c.x + tt*tt*points[3].x;
    const y = (1-tt)*(1-tt)*points[2].y + 2*(1-tt)*tt*c.y + tt*tt*points[3].y;
    return { left: x - 16, top: y - 16 };
  } else {
    const tt = (t-0.75)/0.25;
    const c = { x: points[3].x + 40, y: points[3].y + 80 };
    const x = (1-tt)*(1-tt)*points[3].x + 2*(1-tt)*tt*c.x + tt*tt*points[4].x;
    const y = (1-tt)*(1-tt)*points[3].y + 2*(1-tt)*tt*c.y + tt*tt*points[4].y;
    return { left: x - 16, top: y - 16 };
  }
};
  const pos = getFlamePosition(t);
    return (
    <Image
      source={require('../../assets/images/flame.png')}
      style={[
        {
          position: 'absolute',
          width: 32,
          height: 32,
          zIndex: 2,
        },
        pos,
      ]}
      resizeMode="contain"
    />
  );
};

//de aici incepe homescreen
const HomeScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const router = useRouter();

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  // Calculează lungimea fitilului în funcție de scrollOffset
  const fuseLength = Math.min(scrollOffset / 10, 200); // ajustează 10 și 200 după nevoie
const bubbleData = [
  {
    emoji: "🌡️",
    text: "The last 10 years were the hottest in 125,000 years",
    left: -0.2, // 15% din lățime
    top: -0.01,  // 10% din înălțime
  },
  {
    emoji: "✈️",
    text: "One flight to the US emits more CO₂ than many people",
    left: 0.6,
    top: 0.20,
  },
  {
    emoji: "🧊",
    text: "Greenland is losing ice 7x faster than in the 1990s",
    left: -0.30,
    top: 0.42,
  },
  {
    emoji: "⏳",
    text: "We have less than 10 years before the 1.5°C limit is blown",
    left: 0.55,
    top: 0.75,
  },
];
  
const width = 220;
const height = 800;

const points = [
  { x: 0.15 * width, y: 0.10 * height }, // Bula 1
  { x: 0.65 * width, y: 0.28 * height }, // Bula 2
  { x: 0.10 * width, y: 0.52 * height }, // Bula 3
  { x: 0.55 * width, y: 0.75 * height }, // Bula 4
  { x: 0.6 * width+60,  y: 0.9 * height+20 },  // Bombă
];

  return (
    <ScrollView ref={scrollViewRef}
  onScroll={handleScroll}
  style={styles.container}
  decelerationRate={0.9}>
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
      <View style={styles.bombSection}>
  {/* SVG fuse path */}
<View style={styles.bubblesSection}>
  {bubbleData.map((b, idx) => (
    <View
      key={idx}
      style={[
        styles.bubble,
        {
          left: `${b.left * 100}%`,
          top: `${b.top * 100}%`,
        },
      ]}
    >
      <Text style={styles.bubbleText}>{b.emoji}</Text>
      <Text style={styles.bubbleTextSmall}>{b.text}</Text>
    </View>
  ))}
</View>

<Svg height={height} width={width} style={styles.fuseSvg}>
  <Path
    d={`
      M${points[0].x},${points[0].y}
      Q${points[0].x + 40},${points[0].y + 60} ${points[1].x},${points[1].y}
      Q${points[1].x - 60},${points[1].y + 100} ${points[2].x},${points[2].y}
      Q${points[2].x + 80},${points[2].y + 120} ${points[3].x},${points[3].y}
      Q${points[3].x + 40},${points[3].y + 80} ${points[4].x},${points[4].y}
    `}
    stroke="#6B4F1D"
    strokeWidth={8}
    fill="none"
  />
</Svg>
  {/* Flame image, animated along the fuse */}
  <AnimatedFlame scrollOffset={scrollOffset} />
  {/* Bomb image at the end */}
  <Image
    source={require('../../assets/images/bomb.png')}
    style={styles.bombImage}
    resizeMode="contain"
  />
</View>
{/* Separator alb */}
<View style={{ alignItems: 'center', marginVertical: 24, marginTop:'40%' }}>
  <View style={{ width: '80%', height: 4, backgroundColor: 'white', borderRadius: 2 }} />
</View>

{/* Titlu mare */}
<Text style={{
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'left',
  marginHorizontal: 24,
  marginBottom: '13%',
  marginTop: '3%',
}}>
  Secondly, these are the problems we've felt on our own skin:
</Text>

{/* Casete cu text */}
<View style={{ gap: 25, marginBottom: '12%' }}>
  <View style={{
    backgroundColor: '#E6E3DF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
  }}>
    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 4 }}>
      Lack of awareness
    </Text>
    <Text style={{ color: '#583F2F', fontSize: 15 }}>
      Young people are not sufficiently aware and lack the tools to track and reduce their carbon emissions.
    </Text>
  </View>
  <View style={{
    backgroundColor: '#E6E3DF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
  }}>
    <Text style={{ fontWeight: 'bold', color: '583F2F', fontSize: 16, marginBottom: 4 }}>
      High carbon footprint
    </Text>
    <Text style={{ color: '#583F2F', fontSize: 15 }}>
      Climate change is accelerating due to high carbon footprints.
    </Text>
  </View>
  <View style={{
    backgroundColor: '#E6E3DF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
  }}>
    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 4 }}>
      Inaccessible solutions
    </Text>
    <Text style={{ color: '#583F2F', fontSize: 15 }}>
      There is an urgent need for accessible and engaging solutions to promote sustainable habits.
    </Text>
  </View>
</View>

{/* Textul de jos */}
<Text style={{
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  marginHorizontal: 16,
  marginBottom: 32,
}}>
  That is why we decided to create Orbis!
</Text>
{/* Separator alb */}
<View style={{ alignItems: 'center', marginVertical: 24, marginTop:'10%' }}>
  <View style={{ width: '80%', height: 4, backgroundColor: 'white', borderRadius: 2 }} />
</View>

{/* --- The Orbis App Section --- */}
<View style={{ marginBottom: 40 }}>
  {/* Titlu */}
  <Text style={{
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  }}>
    The Orbis App
  </Text>

  {/* Poze demo */}
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
    <Image
      source={require('../../assets/images/image.png')} // logo ca dummy
      style={{ width: 110, height: 180, borderRadius: 12, marginRight: 16, backgroundColor: '#E6E3DF' }}
      resizeMode="contain"
    />
    <Image
      source={require('../../assets/images/image.png')} // logo ca dummy
      style={{ width: 180, height: 110, borderRadius: 12, backgroundColor: '#E6E3DF' }}
      resizeMode="contain"
    />
  </View>

  {/* Buline cu text */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 32 }}>
  {/* Bula 1 */}
  <View style={{
    width: 130, height: 130, borderRadius: 65, backgroundColor: '#E6E3DF',
    alignItems: 'center', justifyContent: 'flex-start', padding: 12,
  }}>
    <Text style={{
      color: '#3F4F44', fontWeight: 'bold', fontSize: 11,
      textAlign: 'center', marginBottom: 10, marginTop: 8,
    }}>
      An app that calculates your carbon footprint and helps you reduce it.
    </Text>
    <Image
      source={require('../../assets/images/image.png')}
      style={{ width: 28, height: 28, marginTop: 'auto', marginBottom: 6 }}
      resizeMode="contain"
    />
  </View>
  {/* Bula 2 */}
  <View style={{
    width: 130, height: 130, borderRadius: 65, backgroundColor: '#E6E3DF',
    alignItems: 'center', justifyContent: 'flex-start', padding: 12,
  }}>
    <Text style={{
      color: '#3F4F44', fontWeight: 'bold', fontSize: 11,
      textAlign: 'center', marginBottom: 10, marginTop: 8,
    }}>
      It uses satellite data to personalize challenges and tips based on your location.
    </Text>
    <Image
      source={require('../../assets/images/image.png')}
      style={{ width: 28, height: 28, marginTop: 'auto', marginBottom: 6 }}
      resizeMode="contain"
    />
  </View>
  {/* Bula 3 */}
  <View style={{
    width: 130, height: 130, borderRadius: 65, backgroundColor: '#E6E3DF',
    alignItems: 'center', justifyContent: 'flex-start', padding: 12,
  }}>
    <Text style={{
      color: '#3F4F44', fontWeight: 'bold', fontSize: 11,
      textAlign: 'center', marginBottom: 10, marginTop: 8,
    }}>
      It features a virtual planet that evolves based on your eco-friendly actions.
    </Text>
    <Image
      source={require('../../assets/images/image.png')}
      style={{ width: 28, height: 28, marginTop: 'auto', marginBottom: 6 }}
      resizeMode="contain"
    />
  </View>
</View>

  {/* Text mare */}
  <Text style={{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:'5%',
    marginBottom: '10%',
    marginHorizontal: 12,
  }}>
    So, add your friends on Orbis and start a more sustainable lifestyle!
  </Text>

  {/* Buton Get it now */}
  <TouchableOpacity
    style={{
      backgroundColor: '#C7A16E',
      borderRadius: 18,
      paddingVertical: 16,
      alignItems: 'center',
      marginHorizontal: 40,
      marginBottom: 36,
      paddingTop:'5%',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    }}
    onPress={() => {
      // Scroll sus de tot
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }}
    activeOpacity={0.85}
  >
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Get it now</Text>
    <Text style={{ color: 'white', fontSize: 22, marginLeft: 8 }}>↑</Text>
  </TouchableOpacity>

  {/* Footer cu date de contact și logo */}
  <View style={{ alignItems: 'center', marginBottom: 32 , flex:1, paddingTop: '3%'}}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5, gap: 12 }}>
      <Text style={{ color: 'white', fontSize: 11 }}>@orbis.app</Text>
      <Text style={{ color: 'white', fontSize: 11 }}>@Orbis</Text>
      <Text style={{ color: 'white', fontSize: 11 }}>orbis.appclimateaction@gmail.com</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop:'5%' }}>
      <Image source={require('../../assets/images/image.png')} style={{ width: 32, height: 40 }} />
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, marginLeft: 3, marginTop:10 }}>ORBIS</Text>
    </View>
  </View>
</View>



<View style={{ height: 50 }} />
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
    marginLeft:'-2%',
    marginTop: '3%',
    padding: 30,
  },

  logo: {
    width: 30,
    height: 40,
  },
bombSection: {
  width: 220,
  height: 800, // sau chiar mai mult, vezi cât vrei să se întindă
  alignSelf: 'center',
  marginVertical: 30,
  position: 'relative',
  top:'3%',
},
bubblesSection: {
  position: 'absolute',
  width: 220,
  height: 800, // la fel ca bombSection
  left: 0,
 // top: '13%',
  zIndex: 3,
},
bubble: {
  position: 'absolute',
  width: 150,
  height: 150,
  borderRadius: 490,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},
bubbleText: {
  fontSize: 25,
  marginBottom:1,
  marginTop:-9,
},
bubbleTextSmall: {
  fontSize: 11,
  color: 'black',
  textAlign: 'center',
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

fuseSvg: {
  position: 'absolute',
  left: 0,
  top: 0,
},
bombImage: {
  position: 'absolute',
  left: 0.6 * 220 -50, // 40 = width/2 pentru centrare
  top: 0.9 * 800 - 10,  // 40 = height/2 pentru centrare
  width: 140,
  height: 140,
  zIndex: 1,
},
});

export default HomeScreen;