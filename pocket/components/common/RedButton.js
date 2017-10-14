import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const RedButton = ({ style, onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      style={
        [
          style,
          buttonStyle,
          globalStyle.globalRedBackgroundColor
        ]
      }
      onPress={onPress}
    >
      <View
        style={[{
          alignItems: 'center',
          justifyContent: 'center',
          //flex: 1
        }]}
      >
        <Text
          style={
            [
              globalStyle.gloabalFontStyle_H3,
              textStyle
            ]
          }
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const globalStyle = require('./GlobalStyleSheet');

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    //fontSize: 16,
    //fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
  }
};

export { RedButton };
