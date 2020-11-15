import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container } from './index.styles';

const AddProductIcon: React.FC = () => {
  return (
    <View>
      <Container onPress={() => alert('Add product')}>
        <Icon name="plus" size={20} color="#FFFFFF" />
      </Container>
    </View>
  );
};

export default AddProductIcon;
