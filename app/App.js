import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';



export default class App extends React.Component {

  state = {
    tocando: 'parado',
  }

  componentDidMount() {
    console.log('componentDidMount');
    TrackPlayer.setupPlayer().then(() => {
      const track = {
        id: 'unique track id', // Must be a string, required

        // url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3', // Load media from the network
        url: 'http://192.168.15.6:3000/musica', // Load media from the network
        // url: require('./avaritia.ogg'), // Load media from the app bundle
        // url: 'file:///storage/sdcard0/Music/avaritia.wav', // Load media from the file system 

        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339

        artwork: 'http://example.com/avaritia.png', // Load artwork from the network
        // artwork: require('./avaritia.jpg'), // Load artwork from the app bundle
        // artwork: 'file:///storage/sdcard0/Downloads/artwork.png' // Load artwork from the file system
      };
      TrackPlayer.add([track]).then(function () {
        // The tracks were added
      });
    });


    setTimeout(() => {
      this.setState({ tocando: 'tocando' });
      TrackPlayer.play();
    }, 3000);
  }

  render() {
    return (
      <View>
        <Text>{this.state.tocando}</Text>
      </View>
    )
  }

}