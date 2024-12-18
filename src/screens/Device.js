import {
  ActivityIndicator,
  Animated,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colorsPallet";
import Header from "../components/Header";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "../components/RnText";
import Icon from "../components/Icon";
import { hp, wp } from "../helpers/Responsiveness";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import RnButton from "../components/RnButton";
import { routeName } from "../constants/routeName";
import Sound from "react-native-sound";
import TrackPlayer, {
  Capability,
  RatingType,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { Colors } from "../theme";
import Slider from "@react-native-community/slider";
import DatePicker from "react-native-date-picker";
import { BASE_URL } from "../config/Config";
const Device = ({ navigation }) => {
  const [openModal, setOpenModal] = useState(false);
  const [linePosition, setLinePosition] = useState(new Animated.Value(0)); // Track red line position
  const [player, setPlayer] = useState(null);
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const [currentPosition, setCurrentPosition] = useState(0); // Current playback position
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const audioUrl1 = `${BASE_URL}/output_audio/playlist.m3u8`;
  const audioUrl2 = `${BASE_URL}/output_audio1/playlist.m3u8`;
  const [audioUrl, setAudioUrl] = useState(audioUrl1);

  // Increment and Decrement Date Functions
  const incrementDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
    setAudioUrl(audioUrl1);
  };

  const decrementDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
    setAudioUrl(audioUrl2);
  };

  useEffect(() => {
    Sound.setCategory("Playback");

    const sound = new Sound(audioUrl, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("Failed to load the sound", error);
        return;
      }
      setDuration(sound.getDuration());
      sound.play(() => sound.release()); // Play and release the sound when finished
    });

    setPlayer(sound);

    // Clean up
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [audioUrl]);

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

  const playbackState = usePlaybackState();
  // console.log("State", playbackState, State);
  useSetupTrackPlayer();
  const handleStartPlayingAudio = async () => {
    try {
      console.log("Resetting TrackPlayer");
      await TrackPlayer.reset();

      console.log("Adding Track");
      await TrackPlayer.add({
        id: "1", // Unique track ID
        title: "Sample HLS Audio",
        artist: "Unknown Artist",
        artwork: "https://via.placeholder.com/150", // Optional artwork URL
        url: audioUrl, // M3U8 file URL
        type: "audio", // Explicitly define the type
      });

      console.log("Starting Playback");
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error in handleStartPlayingAudio:", error);
    }
  };

  const { Duration, position } = useProgress();
  useEffect(() => {
    if (Duration > 0) {
      const percentage = position / Duration; // Calculate playback percentage
      const lineX = percentage * 100; // Calculate the red line's X position (timelineWidth is your ScrollView's width)

      // Animate the red line's movement
      Animated.timing(linePosition, {
        toValue: lineX,
        Duration: 100, // Adjust for smooth movement
        useNativeDriver: false,
      }).start();
    }
  }, [position]);
  const generateTimeline = () => {
    const timeline = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      timeline.push(`${formattedHour}:00`);
    }
    return timeline;
  };
  const timelineData = generateTimeline();
  const HOURS = Array.from({ length: 24 }, (_, i) => {
    const startTime = `${i.toString().padStart(2, "0")}:00`;
    return {
      time: startTime,
      audioUrl: i === 7 ? audioUrl : null, // Example: assign the audioUrl for the 7:00 AM slot
      audioStartTime: i === 7 ? "07:30" : null, // Example: audio starts at 7:30 AM
      audioDuration: i === 7 ? 100 : null, // Example: 100 seconds duration for 7:30 AM slot
    };
  });
  // console.log("HOURS", HOURS);

  const scrollViewRef = useRef(null);

  // Automatically scroll to the current time (if required)
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (currentHour / 24) * (wp(100) * 3),
        animated: true,
      });
    }
  }, []);
  const handleSeekBackward = () => {
    if (player) {
      const newPosition = Math.max(currentPosition - 15, 0);
      player.setCurrentTime(newPosition);
      setCurrentPosition(newPosition);
    }
  };
  const handleSeekForward = () => {
    // console.log('player', player.isPlaying())
    if (player) {
      const newPosition = Math.min(currentPosition + 15, duration);
      player.setCurrentTime(newPosition);
      setCurrentPosition(newPosition);
    }
  };
  return (
    <ImageBackground source={globalPath.backg} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={"Device 1"} leftIcon rightIcon dots />
        <View style={styles.today}>
          <TouchableOpacity onPress={decrementDate}>
            <Icon source={globalPath.leftA} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <ResponsiveText>
              {date.toDateString()} {/* Display selected date */}
            </ResponsiveText>
          </TouchableOpacity>

          <TouchableOpacity onPress={incrementDate}>
            <Icon source={globalPath.rightA} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {/* <Button title="Select Date" onPress={() => setOpen(true)} /> */}

        {/* Date Picker Modal */}
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />
        <View style={{ height: hp(20) }}>
          <ScrollView
            horizontal
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {HOURS.map((item, index) => (
              <View>
                <View
                  key={"abc" + index}
                  style={[
                    styles.hourBlock,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <View
                    style={{
                      height: 20,
                      width: 1,
                      backgroundColor: colors.white,
                    }}
                  />
                  <View
                    style={{
                      height: 10,
                      width: 1,
                      backgroundColor: colors.white,
                    }}
                  />
                  <View
                    style={{
                      height: 10,
                      width: 1,
                      backgroundColor: colors.white,
                    }}
                  />
                  <View
                    style={{
                      height: 10,
                      width: 1,
                      backgroundColor: colors.white,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: 1,
                      backgroundColor: colors.white,
                    }}
                  />
                </View>
                <View
                  key={index}
                  style={[styles.hourBlock, { left: -16, marginTop: 5 }]}
                >
                  <ResponsiveText size={3}>{item.time}</ResponsiveText>
                </View>
                {item.audioUrl && (
                  <Slider
                    value={position}
                    minimumValue={0}
                    maximumValue={Duration}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTrackTintColor="#8e8e93"
                    thumbTintColor="#1EB1FC"
                    onSlidingComplete={async (value) =>
                      await TrackPlayer.seekTo(value)
                    }
                    // thumbImage={require("./../assets/icons/redline-removebg-preview.png")}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          {/* Current time marker */}
          <View style={styles.markerContainer}>
            {/* <View style={styles.marker} /> */}
            <Animated.View
              style={[
                styles.marker,
                { transform: [{ translateX: linePosition }] },
              ]}
            />
          </View>
        </View>
        {/* Seekbar */}
        <View>
          <ResponsiveText textAlign={"center"}>
            Audio Stream Player
          </ResponsiveText>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentPosition}
            onSlidingComplete={handleSlidingComplete}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#8e8e93"
            thumbTintColor="#1EB1FC"
          />
          <View style={styles.timeContainer}>
            <ResponsiveText>{formatTime(currentPosition)}</ResponsiveText>
            <ResponsiveText>{formatTime(duration)}</ResponsiveText>
          </View>
          {/* <Button
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
          /> */}
        </View>
        <View style={styles.controlerContainer}>
          <View style={styles.time}>
            <ResponsiveText>{convertSecondsToTime(position)}</ResponsiveText>
          </View>
          <View style={styles.control}>
            <TouchableOpacity
              onPress={async () => {
                // await TrackPlayer.seekBy(-15);
                handleSeekBackward();
              }}
            >
              <Icon source={globalPath.dec} size={wp(7)} />
            </TouchableOpacity>
            {playbackState.state === State.Buffering ||
            playbackState.state === State.Loading ? (
              <ActivityIndicator size={24} color={Colors.black} />
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  // console.log(playbackState.state);
                  // return;
                  // console.log("TrackPlayer", await TrackPlayer.getProgress());

                  // playbackState.state === State.Playing
                  //   ? player.pause()
                  //   : playbackState.state === State.Paused ||
                  //     playbackState.state === State.Ready
                  //   ? player.play()
                  //   : handleStartPlayingAudio();

                  if (player?.isPlaying()) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
              >
                <Icon
                  source={
                    // playbackState.state === State.Playing
                    player?.isPlaying()
                      ? globalPath.pause
                      : globalPath.play //replace with the play icon
                  }
                  size={wp(5)}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={async () => {
                // await TrackPlayer.seekBy(15);
                handleSeekForward();
              }}
            >
              <Icon source={globalPath.increase} size={wp(7)} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={async () => {}} style={styles.playButton}>
          <Icon source={globalPath.play} size={wp(8)} />
          <ResponsiveText margin={[0, 0, 0, 10]} weight={"bold"}>
            Live Listen
          </ResponsiveText>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Device;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  controlerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // width: wp(40),
    justifyContent: "space-between",
    paddingHorizontal: wp(10),
    backgroundColor: "#898989",
    height: hp(6),
    marginTop: hp(2),
  },
  time: {
    backgroundColor: colors.skyblue1,
    height: 25,
    width: wp(20),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(40),
    justifyContent: "space-between",
  },
  today: {
    flexDirection: "row",
    alignSelf: "center",
    width: wp(40),
    justifyContent: "space-between",
    marginVertical: hp(2),
  },
  playButton: {
    flexDirection: "row",
    width: wp(35),
    height: hp(6),
    backgroundColor: "#898989",
    alignSelf: "center",
    marginTop: hp(6),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.skyblue1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: wp(100) / 2 - 20, // Center the marker
    backgroundColor: "#898989",
  },
  hourBlock: {
    width: 80,
    // alignItems: "center",
  },
  hourText: {
    color: "#fff",
    fontSize: 14,
  },
  markerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  marker: {
    width: 2,
    height: hp(19),
    backgroundColor: "red",
  },
});

//you can move this to its own folder

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });

  await TrackPlayer.updateOptions({
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });

  await TrackPlayer.setVolume(0.3); // not too loud
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const useSetupTrackPlayer = ({ onLoad } = { onLoad: () => {} }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch((error) => {
        isInitialized.current = false;
        // console.error(error);
      });
  }, [onLoad]);
};

function convertSecondsToTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
}

// // App.js
// import React, { useEffect } from 'react';
// import { View, Button } from 'react-native';
// import TrackPlayer from 'react-native-track-player';
// import { setupPlayer, addTrack } from './playerService';

// const Device = () => {
//     useEffect(() => {
//         const initializePlayer = async () => {
//             const isSetup = await setupPlayer();
//             if (isSetup) {
//                 await addTrack('http://192.168.137.229:5002/output_audio/playlist.m3u8');
//                 await TrackPlayer.play();
//             }
//         };

//         initializePlayer();

//         return () => {
//             TrackPlayer.destroy(); // Cleanup on unmount
//         };
//     }, []);

//     const seekForward = async () => {
//         const position = await TrackPlayer.getProgress().then((progress) => progress.position);
//         await TrackPlayer.seekTo(position + 15); // Seek forward 15 seconds
//     };

//     const seekBackward = async () => {
//         const position = await TrackPlayer.getProgress().then((progress) => progress.position);
//         await TrackPlayer.seekTo(Math.max(0, position - 15)); // Seek backward 15 seconds
//     };

//     return (
//         <View>
//             <Button title="Play" onPress={() => TrackPlayer.play()} />
//             <Button title="Pause" onPress={() => TrackPlayer.pause()} />
//             <Button title="Seek Forward 15s" onPress={seekForward} />
//             <Button title="Seek Backward 15s" onPress={seekBackward} />
//         </View>
//     );
// };

// export default Device;
