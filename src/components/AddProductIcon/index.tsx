import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { useSetRecoilState } from 'recoil';
import { Container } from './index.styles';
import { productInEditModeState } from '../../store';

const AddProductIcon: React.FC = () => {
  const navigation = useNavigation();
  const setProductInEditMode = useSetRecoilState(productInEditModeState);

  return (
    <View>
      <Container
        onPress={() => {
          navigation.navigate('AddEditProductScreen');
          setProductInEditMode(false);
        }}>
        <Icon name="plus" size={20} color="#FFFFFF" />
      </Container>
    </View>
  );
};

export default AddProductIcon;
