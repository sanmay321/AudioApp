import React, { forwardRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../constants/colorsPallet';
import {handleMargin, handlePadding} from '../constants/theme';
import Fonts from '../helpers/Fonts';
import {hp, wp} from '../helpers/Responsiveness';
import Icon from './Icon';
import {globalPath} from '../constants/globalPath';

const Input = forwardRef(({
  iconSize,
  height,
  color,
  margin,
  backgroundColor,
  padding,
  zIndex,
  fontFamily,
  tintColor,
  placeholder,
  iconMargin,
  rightIconMargin,
  placeholderTextColor,
  width,
  containerStyle,
  secureTextEntry,
  onChangeText,
  fontSize,
  value,
  onSubmitEditing,
  searchBox,
  shadowColor,
  inputHeight,
  maxLength,
  leftIcon,
  keyboardType,
  onFocus,
  onBlur,
  border,
  multiline,
  onPressright,
  rightIcon,
  editable,
  textAlign,
  textTransform,
  ...props
}, ref) => {
  const updateSecureTextEntry = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = React.useState(true);

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        props.style,
        height && {height},
        width && {width},
        backgroundColor && {backgroundColor},
        containerStyle,
      ]}>
     
      <TextInput
        ref={ref}
        value={value && value}
        maxLength={maxLength && maxLength}
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable={editable}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={[
          {fontSize: isNaN(fontSize) ? wp(3) : wp(fontSize)},
          styles.Input,
          textAlign&&{textAlign},
          multiline && {
            textAlignVertical: 'top',
            paddingVertical: 15,
            height: height,
          },
          {textTransform:textTransform?textTransform:'uppercase'}
        ]}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : colors.white
        }
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ? visible : false}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
      />
      {secureTextEntry && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
            onPress={updateSecureTextEntry}
          >
            {visible ? (
              <Icon
                size={20}
                tintColor={colors.grey1}
                margin={[0, 10, 0, 0]}
                source={globalPath.CloseEye}
              />
            ) : (
              <Icon
                size={20}
                tintColor={colors.grey1}
                margin={[0, 10, 0, 0]}
                source={globalPath.Eye}
              />
            )}
          </TouchableOpacity>
        )}
     
     
    </KeyboardAvoidingView>
  );
});


export default Input;

const styles = StyleSheet.create({
  container: {
    height: wp(10),
    width: wp(80),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.transparent,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: hp(2),
    // elevation: 1,
    borderWidth: 1,
    borderColor: colors.skyblue1,
  },
  Input: {
    borderRadius: 5,
    fontFamily: Fonts.MontserratLight,
    color: colors.white,
    flex: 1,
    // textAlignVertical: "top",
    textTransform: 'uppercase',
    textAlign:'center',
    fontSize:wp(3.5)
  },
  Feather: {
    marginRight: 5,
    // color: colors.black,
  },
  showPasswordBtn: {
    height: '50%',
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
