import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colorsPallet';
import Header from '../components/Header';
import { globalPath } from '../constants/globalPath';
import ResponsiveText from '../components/RnText';
import Icon from '../components/Icon';
import { hp, wp } from '../helpers/Responsiveness';
import DropDown from '../components/DropDown';
import Input from '../components/Input';
import RnButton from '../components/RnButton';
import { routeName } from '../constants/routeName';
import TrackPlayer, {
  Capability,
  RatingType,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { Colors } from '../theme';
import Slider from '@react-native-community/slider';

const Device = ({ navigation }) => {
  const [openModal, setOpenModal] = useState(false);
  const data = [
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
    {
      name: 'Device',
    },
  ];
  const audioUrl = 'https://download.samplelib.com/mp3/sample-15s.mp3';

  const playbackState = usePlaybackState();
  useSetupTrackPlayer();
  const handleStartPlayingAudio = async () => {
    console.log('adding');
    await TrackPlayer.reset();
    await TrackPlayer.add([
      {
        title: 'A sample title',
        url: audioUrl,
        // artist: track.uploadedBy,
        // artwork: 'https://images.unsplash.com/photo-1620565404258-27ef4fbb0b72',
      },
    ]);
    await TrackPlayer.play();
  };
  const { duration, position } = useProgress();
  return (
    <ImageBackground source={globalPath.backg} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={'Device 1'} leftIcon rightIcon dots />
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
          <FlatList
            horizontal
            data={data}
            contentContainerStyle={{
              alignItems: 'center',
              backgroundColor: colors.grey1,
            }}
            renderItem={({ item, index }) => (
              <ResponsiveText margin={[8, 0, 0, 0]}>
                {item.name}
                {index + 1}
              </ResponsiveText>
            )}
          />
        </View>

        <Slider
          value={position}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor={colors.red}
          minimumTrackTintColor={colors.ModelClr}
          maximumTrackTintColor={colors.BtnClr}
          onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
        />

        <View style={styles.controlerContainer}>
          <View style={styles.time}>
            <ResponsiveText>{convertSecondsToTime(position)}</ResponsiveText>
          </View>
          <View style={styles.control}>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.seekBy(-15);
              }}>
              <Icon source={globalPath.dec} size={wp(7)} />
            </TouchableOpacity>
            {playbackState.state === State.Buffering ||
            playbackState.state === State.Loading ? (
              <ActivityIndicator size={24} color={Colors.black} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  // console.log(playbackState.state);
                  // return;
                  playbackState.state === State.Playing
                    ? TrackPlayer.pause()
                    : playbackState.state === State.Paused ||
                      playbackState.state === State.Ready
                    ? TrackPlayer.play()
                    : handleStartPlayingAudio();
                }}>
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
                await TrackPlayer.seekBy(-15);
              }}>
              <Icon source={globalPath.increase} size={wp(7)} />
            </TouchableOpacity>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    // width: wp(40),
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    backgroundColor: colors.grey1,
    height: hp(6),
    marginTop: hp(2),
  },
  time: {
    backgroundColor: colors.skyblue1,
    height: 25,
    width: wp(20),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(40),
    justifyContent: 'space-between',
  },
  today: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(40),
    justifyContent: 'space-between',
    marginVertical: hp(2),
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
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0');

  return `${hours}:${minutes}:${secs}`;
}
