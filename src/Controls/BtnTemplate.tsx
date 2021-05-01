import React, {useContext} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import PropsContext, {IconsInterface} from './../PropsContext';
import styles from '../Style';
import icons from './Icons';

interface BtnTemplateInterface {
  name: keyof IconsInterface;
  color?: string;
  onPress?: TouchableOpacityProps['onPress'];
  style?: StyleProp<ViewStyle>;
}

const BtnTemplate: React.FC<BtnTemplateInterface> = (props) => {
  const {styleProps} = useContext(PropsContext);
  const {BtnTemplateStyles, theme, iconSize, customIcon} = styleProps || {};

  return (
    <TouchableOpacity
      style={{
        ...styles.controlBtn,
        ...(BtnTemplateStyles as object),
        ...(props.style as object),
      }}
      onPress={props.onPress}>
      <Image
        style={{
          width: iconSize || 25,
          height: iconSize || 25,
          tintColor: theme || props.color || '#fff',
        }}
        source={{
          uri: customIcon?.[props.name]
            ? customIcon[props.name]
            : icons[props.name],
        }}
      />
    </TouchableOpacity>
  );
};

export default BtnTemplate;
