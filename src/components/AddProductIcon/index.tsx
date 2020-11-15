import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container } from './index.styles';

const AddProductIcon: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Container onPress={() => navigation.navigate('AddEditProductScreen')}>
        <Icon name="plus" size={20} color="#FFFFFF" />
      </Container>
    </View>
  );
};

export default AddProductIcon;
