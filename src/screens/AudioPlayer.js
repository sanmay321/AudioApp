import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import Svg, { Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AudioPlayer = () => {
  const [player, setPlayer] = useState(null);
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const [currentPosition, setCurrentPosition] = useState(0); // Current playback position
  const [waveformData, setWaveformData] = useState([]); // Waveform data from JSON

  useEffect(() => {
    const fetchWaveformData = async () => {
      try {
        const response = await fetch('http://192.168.137.229:5002/output_audio/waveform.json');
        const textData = await response.text();
        console.log('Fetched data:', textData);
        
        const lines = textData.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
        const parsedData = [];
        
        for (let line of lines) {
          const rmsLevelMatch = line.match(/lavfi\.astats\.Overall\.RMS_level=(-?\d+\.\d+)/);
          parsedData.push(rmsLevelMatch ? parseFloat(rmsLevelMatch[1]) : 0);
          
          // Optionally render incrementally
          if (parsedData.length % 100 === 0) {
            setWaveformData([...parsedData]); // Update the state in chunks
          }
        }
        
        setWaveformData(parsedData); // Final state update
      } catch (error) {
        console.error('Error fetching waveform data:', error);
      }
    };
  
    fetchWaveformData();
  }, []);
  

  useEffect(() => {
    Sound.setCategory('Playback');

    const sound = new Sound(
      'http://192.168.137.229:5002/output_audio1/playlist.m3u8',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error('Failed to load the sound', error);
          return;
        }
        setDuration(sound.getDuration());
        sound.play(() => sound.release()); // Play and release the sound when finished
      }
    );

    setPlayer(sound);

    // Clean up
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const updateCurrentPosition = () => {
    if (player) {
      player.getCurrentTime((seconds) => {
        setCurrentPosition(seconds);
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(updateCurrentPosition, 1000); // Update current position every second
    return () => clearInterval(interval);
  }, [player]);

  const handleSlidingComplete = (value) => {
    if (player) {
      player.setCurrentTime(value); // Seek to the specified time
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Stream Player</Text>
      <View style={styles.timelineContainer}>
        {waveformData.length > 0 ? (
          <Svg height={100} width={SCREEN_WIDTH}>
            {waveformData.map((rms, index) => (
              <Rect
                key={index}
                x={(index / waveformData.length) * SCREEN_WIDTH}
                y={100 - (rms + 60)} // Adjust y position based on RMS value
                width={SCREEN_WIDTH / waveformData.length}
                height={rms + 60} // Scale height based on RMS value
                fill={index / waveformData.length <= currentPosition / duration ? '#1EB1FC' : '#8e8e93'}
              />
            ))}
          </Svg>
        ) : (
          <Text>Loading waveform...</Text> // Show loading text
        )}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentPosition}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#1EB1FC"
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
      <Button
        title="Pause"
        onPress={() => {
          if (player) player.pause();
        }}
      />
      <Button
        title="Play"
        onPress={() => {
          if (player) player.play();
        }}
      />
    </View>
  );
  
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  timelineContainer: {
    width: SCREEN_WIDTH,
    height: 100,
    marginVertical: 20,
  },
  slider: {
    width: SCREEN_WIDTH,
    height: 40,
    position: 'absolute',
    bottom: 0,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#8e8e93',
  },
});

export default AudioPlayer;
