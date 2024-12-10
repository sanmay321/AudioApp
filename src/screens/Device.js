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

const Device = ({ navigation }) => {
  const [openModal, setOpenModal] = useState(false);
  const [linePosition, setLinePosition] = useState(new Animated.Value(0)); // Track red line position

  const audioUrl = "https://download.samplelib.com/mp3/sample-15s.mp3";

  const playbackState = usePlaybackState();
  useSetupTrackPlayer();
  const handleStartPlayingAudio = async () => {
    console.log("adding");
    await TrackPlayer.reset();
    await TrackPlayer.add([
      {
        title: "A sample title",
        url: audioUrl,
        // artist: track.uploadedBy,
        // artwork: 'https://images.unsplash.com/photo-1620565404258-27ef4fbb0b72',
      },
    ]);
    await TrackPlayer.play();
  };
  const { duration, position } = useProgress();
  useEffect(() => {
    if (duration > 0) {
      const percentage = position / duration; // Calculate playback percentage
      const lineX = percentage * 100; // Calculate the red line's X position (timelineWidth is your ScrollView's width)

      // Animate the red line's movement
      Animated.timing(linePosition, {
        toValue: lineX,
        duration: 100, // Adjust for smooth movement
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
  console.log("HOURS", HOURS);

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
  return (
    <ImageBackground source={globalPath.backg} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={"Device 1"} leftIcon rightIcon dots />
        <View style={styles.today}>
          <TouchableOpacity>
            <Icon source={globalPath.leftA} />
          </TouchableOpacity>
          <ResponsiveText>Today</ResponsiveText>
          <TouchableOpacity>
            <Icon source={globalPath.rightA} />
          </TouchableOpacity>
        </View>
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
                    maximumValue={duration}
                    thumbTintColor={colors.red}
                    minimumTrackTintColor={colors.white}
                    maximumTrackTintColor={colors.BtnClr}
                    onSlidingComplete={async (value) =>
                      await TrackPlayer.seekTo(value)
                    }
                    thumbImage={require("./../assets/icons/redline-removebg-preview.png")}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          {/* Current time marker */}
          <View style={styles.markerContainer}>
            {/* <View style={styles.marker} /> */}
            {/* <Animated.View
              style={[
                styles.marker,
                { transform: [{ translateX: linePosition }] },
              ]}
            /> */}
          </View>
        </View>

        <View style={styles.controlerContainer}>
          <View style={styles.time}>
            <ResponsiveText>{convertSecondsToTime(position)}</ResponsiveText>
          </View>
          <View style={styles.control}>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.seekBy(-15);
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
                  console.log("TrackPlayer", await TrackPlayer.getProgress());

                  playbackState.state === State.Playing
                    ? TrackPlayer.pause()
                    : playbackState.state === State.Paused ||
                      playbackState.state === State.Ready
                    ? TrackPlayer.play()
                    : handleStartPlayingAudio();
                }}
              >
                <Icon
                  source={
                    playbackState.state === State.Playing
                      ? globalPath.pause
                      : globalPath.plus //replace with the play icon
                  }
                  size={wp(5)}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.seekBy(15);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
