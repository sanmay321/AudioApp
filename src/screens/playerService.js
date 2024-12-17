// playerService.js
import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';

export async function setupPlayer() {
    let isSetup = false;

    try {
        await TrackPlayer.getActiveTrackIndex();
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } finally {
        return isSetup;
    }
}

export async function addTrack(url) {
    await TrackPlayer.add([
        {
            id: '1', // Unique ID for the track
            url: url,
            title: 'Track Title',
            artist: 'Track Artist',
            // artwork: 'https://example.com/artwork.jpg', // Optional artwork
            type: TrackType.HLS // Specify the track type as HLS
        },
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
}

export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.PlaybackError, err => {
        console.log(err);
    });
}
