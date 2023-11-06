/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
  
   
      const fetchData = async () => {
        try {
            const response = await fetch('https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/test');
          console.log(await response.json());
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData();

AppRegistry.registerComponent(appName, () => App);
