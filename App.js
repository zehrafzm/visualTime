import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
