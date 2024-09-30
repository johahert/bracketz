const profilepic1 = require('../assets/images/profilepics/profilepic1.png');
const profilepic2 = require('../assets/images/profilepics/profilepic2.png');
const profilepic3 = require('../assets/images/profilepics/profilepic3.png');
const profilepic4 = require('../assets/images/profilepics/profilepic4.png');
const profilepic5 = require('../assets/images/profilepics/profilepic5.png');
const profilepic6 = require('../assets/images/profilepics/profilepic6.png');
const profilepic7 = require('../assets/images/profilepics/profilepic7.png');
const profilepic8 = require('../assets/images/profilepics/profilepic8.png');
const profilepic9 = require('../assets/images/profilepics/profilepic9.png');
const profilepic10 = require('../assets/images/profilepics/profilepic10.png');
const profilepic11 = require('../assets/images/profilepics/profilepic11.png');
const profilepic12 = require('../assets/images/profilepics/profilepic12.png');

import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

export const profilePictures: { [key: number]: ImageSourcePropType } = {
    1: profilepic1,
    2: profilepic2,
    3: profilepic3,
    4: profilepic4,
    5: profilepic5,
    6: profilepic6,
    7: profilepic7,
    8: profilepic8,
    9: profilepic9,
    10:profilepic10,
    11:profilepic11,
    12:profilepic12,
};

interface ProfilePictureProps {
    id?: number;
    size?: number;
  }
  
  export const ProfilePicture: React.FC<ProfilePictureProps> = ({ id, size = 64 }) => {
    const idUse = id? id : 1
    
    return (
     

      <Image
        source={profilePictures[idUse]}
        style={{ width: size, height: size, borderRadius: size / 8 }}
        />
      
    );
  };