import React, {useContext} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  Text,
  View,
} from 'react-native';
import PropsContext from '../Contexts/PropsContext';
import styles from '../Style';
import icons, {IconsInterface} from './Icons';
import useImageDelay from '../../../src/hooks/useImageDelay';
import isSafariBrowser from '../../../src/utils/isSafariBrowser';

interface BtnTemplateInterface {
  name: keyof IconsInterface;
  color?: string;
  onPress?: TouchableOpacityProps['onPress'];
  style?: StyleProp<ViewStyle>;
  btnText?: string;
  disabled?: boolean;
}

const BtnTemplate: React.FC<BtnTemplateInterface> = (props) => {
  const {disabled = false} = props;
  const {styleProps} = useContext(PropsContext);
  const {BtnTemplateStyles, theme} = styleProps || {};

  const imageRef = React.useRef(null);

  if (isSafariBrowser()) {
    // This fixes the tint issue in safari browser
    useImageDelay(imageRef, 10, '');
  }

  return (
    <TouchableOpacity
      style={{width: '100%', height: '100%'}}
      disabled={disabled}
      onPress={props.onPress}>
      <View
        style={[
          {...styles.controlBtn, ...(BtnTemplateStyles as object)},
          props.style as object,
        ]}>
        <Image
          ref={imageRef}
          style={{
            width: '100%',
            height: '100%',
            opacity: disabled ?  0.4 : 1,
            tintColor: disabled ? 'grey' : ( props.color || theme || '#fff')
          }}
          resizeMode={'contain'}
          source={{uri: icons[props.name]}}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          color: disabled ? 'grey' : (props.color || theme || '#fff'),
          opacity: disabled ? 0.4 : 1
        }}>
        {props.btnText}
      </Text>
    </TouchableOpacity>
  );
};

export default BtnTemplate;
