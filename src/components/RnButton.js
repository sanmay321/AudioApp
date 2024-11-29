import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colorsPallet';
import {handleMargin, handlePadding} from '../constants/theme';
import {hp, wp} from '../helpers/Responsiveness';
import ResponsiveText from './RnText';

const RnButton = ({
  backgroundColor,
  textColor,
  width,
  padding,
  margin,
  gradColor,
  height,
  borderRadius,
  title,
  fontFamily,
  onPress,
  position,
  isIconFalse,
  textAlign,
  alignSelf,
  justifyContent,
  leftIcon,
  disabled,
  ...props
}) => {
  // Define the disabled styles
  const disabledStyles = disabled
    ? {
        backgroundColor: undefined, // Change this to your desired light grey color
      }
    : {};
  // Define the text color based on the disabled state

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.Btn,
        props.btnStyle ? props.btnStyle : undefined,
        margin && handleMargin(margin),
        padding && handlePadding(padding),
        position && {alignSelf: position},
        backgroundColor && {backgroundColor},
        width && {width},
        alignSelf && {alignSelf},
        justifyContent && {justifyContent},
        disabledStyles,
      ]}
      {...props}>
     
      {title && (
        <ResponsiveText
          size={3}
          padding={[0, 10]}
          weight={'bold'}
          color={colors.white} // Use the calculated title color
          textAlign={textAlign ? textAlign : 'center'}>
          {title}
        </ResponsiveText>
      )}

      {props.children}
    </TouchableOpacity>
  );
};

export default RnButton;

const styles = StyleSheet.create({
  Btn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: colors.skyblue1,
    height: wp(8),
    width: wp(25),
    marginTop: hp(3),
    borderRadius: 10,
    paddingHorizontal: 5,
    borderWidth:1,
    borderColor:colors.skyblue1
  },
});
