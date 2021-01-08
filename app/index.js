
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import { typography } from './src/Typography';


TrackPlayer.updateOptions({
    stopWithApp: true,
});

LogBox.ignoreLogs(['Require cycle']);

typography();

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => require('./service.js'));
