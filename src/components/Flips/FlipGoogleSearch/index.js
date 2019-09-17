import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Button,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native'
import { WebView } from 'react-native-webview'
import PropTypes from 'prop-types'
import loadScript from 'load-script'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { ActivityIndicator } from 'react-native-paper'
import styles from './styles'

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js?onload=onApiLoad'

const scriptLoadingStarted = false

export default function FlipGoogleSearch({ onSelect }) {
  function isGoogleReady() {
    return !!window.gapi
  }

  // function onApiLoad() {}

  // useEffect(() => {
  //   if (isGoogleReady()) {
  //     // onApiLoad()
  //     loadScript(GOOGLE_SDK_URL, onApiLoad)
  //   }

  //   loadScript(GOOGLE_SDK_URL, onApiLoad)

  //   // if (!scriptLoadingStarted) {
  //   //   // scriptLoadingStarted = true
  //   // loadScript(GOOGLE_SDK_URL, onApiLoad)
  //   // }
  // }, [])

  // function onChoose() {
  //   // const
  // }
  // const [googleSearchHeightFrame, setHeight] = useState(0)
  // const [pics, setPics] = useState([])
  // const [isLoading, setLoading] = useState(false)

  const input = useRef()

  // async function handleSearch(query) {
  //   setLoading(true)
  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/customsearch/v1?key=AIzaSyAC5JbFvQ14H4ExaOtpFYJ_pfnd26eiuz0&cx=017512647261346726039:jct9zpubrlh&q=${query}`
  //     ).json()
  //     setLoading(false)
  //     // setPics(response)
  //     console.info(response)
  //   } catch (error) {
  //     console.info(error)
  //     setLoading(false)
  //   }
  // }

  const INJECTED_JAVASCRIPT = `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
      <title>Google Picker Example</title>
  
      <script type="text/javascript">
  
        // The Browser API key obtained from the Google API Console.
        var developerKey = 'xxxxxxxYYYYYYYY-12345678';
  
        // The Client ID obtained from the Google API Console. Replace with your own Client ID.
        var clientId = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
  
        // Scope to use to access user's photos.
        var scope = 'https://www.googleapis.com/auth/photos';
  
        var pickerApiLoaded = false;
        var oauthToken;
  
        // Use the API Loader script to load google.picker and gapi.auth.
        function onApiLoad() {
          gapi.load('picker', onPickerApiLoad);
        }
  
        function onAuthApiLoad() {
          var authBtn = document.getElementById('auth');
          authBtn.disabled = false;
          authBtn.addEventListener('click', function() {
            gapi.auth2.init({ client_id: clientId }).then(function(googleAuth) {
              googleAuth.signIn({ scope: scope }).then(function(result) {
                handleAuthResult(result.getAuthResponse());
              })
            })
          });
        }
  
        function onPickerApiLoad() {
          pickerApiLoaded = true;
          createPicker();
        }
  
        function handleAuthResult(authResult) {
          if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
            createPicker();
          }
        }
  
        // Create and render a Picker object for picking from Google Photos.
        function createPicker() {
          window.ReactNativeWebView.postMessage("Hello world1")
          var picker = new google.picker.PickerBuilder().
              addView(google.picker.ViewId.IMAGE_SEARCH).
              setMimesTypes
              setCallback(pickerCallback).
              build();
          picker.setVisible(true);
          if (pickerApiLoaded) {
            var picker = new google.picker.PickerBuilder().
                addView(google.picker.ViewId.PHOTOS).
                setOAuthToken(oauthToken).
                setDeveloperKey(developerKey).
                setCallback(pickerCallback).
                build();
            picker.setVisible(true);
          }
        }
  
        // A simple callback implementation.
        function pickerCallback(data) {
          var url = 'nothing';
          if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];
          }
          var message = 'You picked: ' + url;
          document.getElementById('result').innerHTML = message;
        }
      </script>
    </head>
    <body>
      <button type="button" id="auth" disabled>Authenticate</button>
  
      <div id="result"></div>
  
      <!-- The Google API Loader script. -->
      <script type="text/javascript" src="https://apis.google.com/js/api.js?onload=onApiLoad"></script>
    </body>
  </html>
  `

  return (
    <View style={styles.form}>
      {/* <Text>Google</Text> */}
      <WebView
        originWhiteList={['*']}
        source={{ html: INJECTED_JAVASCRIPT }}
        onMessage={event => {
          alert(event.nativeEvent.data)
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        style={{ height: 400, width: '100%' }}
      />

      {/* <Button title="Press" onPress={onChoose} /> */}

      {/* <View style={{ flexDirection: 'row' }}>
        <TextInput ref={input} />
        <TouchableOpacity
          style={{ backgroundColor: 'blue', width: 50 }}
          onPress={handleSearch}
        >
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View> */}

      {/* {isLoading ? (
        <ActivityIndicator color="blue" size="small" />
      ) : (
        // <View>{results.map(item)}</View>
      )} */}
    </View>
  )
}

FlipGoogleSearch.propTypes = {
  onSelect: PropTypes.func,
}
