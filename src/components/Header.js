import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ResponsiveText from './RnText';
import {colors} from '../constants/colorsPallet';
import {hp, wp} from '../helpers/Responsiveness';

const Header = ({title}) => {
  return (
    <View
      style={{
        backgroundColor: colors.grey1,
        alignItems: 'center',
        paddingVertical: wp(5),
      }}>
      <ResponsiveText size={4} weight={'bold'} color={colors.white} >{title}</ResponsiveText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
