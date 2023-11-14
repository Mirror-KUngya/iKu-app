/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import getToken from './getToken';
import sendTokenToServer from './sendToken';

const fetchData = async () => {
  try {
    // 배포 서버 주소
    const response = await fetch('https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/test');
    console.log(await response.json());
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};
fetchData();

// 파이어베이스 디바이스 토큰 보내기. 지우면 안돼용
const postToken = async () => {
  try {
    const token = await getToken();
    if (token) {
      sendTokenToServer(token);
      console.log(token);
    }
  } catch (error) {
    console.error('Error sending data to the server:', error);
  }
};

postToken();

AppRegistry.registerComponent(appName, () => App);
