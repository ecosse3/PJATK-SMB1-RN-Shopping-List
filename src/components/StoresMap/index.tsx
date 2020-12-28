import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ArrowContainer, HeaderWrapper } from './index.styles';
import { useGeolocation } from '../../hooks/useGeolocation';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const StoresMap: React.FC = () => {
  const position = useGeolocation();
  const [height, setHeight] = useState(180);

  return (
    <HeaderWrapper height={height}>
      <MapView style={styles.map} region={position}>
        <Marker title="Twoje położenie" coordinate={position}>
          <MaterialCommunityIcons name="tooltip-account" size={26} color="red" />
        </Marker>
      </MapView>
      <ArrowContainer>
        <TouchableOpacity onPress={() => setHeight(height === 180 ? 480 : 180)}>
          <MaterialCommunityIcons name="arrow-down" size={20} color="black" />
        </TouchableOpacity>
      </ArrowContainer>
    </HeaderWrapper>
  );
};

export default StoresMap;
