import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
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

  const [heightValue, setHeightValue] = useState(180);
  const animatedHeight = useRef(new Animated.Value(180)).current;

  const startAnimation = () => {
    Animated.timing(animatedHeight, {
      useNativeDriver: false,
      duration: 300,
      toValue: heightValue === 180 ? 480 : 180
    }).start();
  };

  const unsubscribe = animatedHeight.addListener((res) => {
    setHeightValue(res.value);
  });

  useEffect(() => {
    return animatedHeight.removeListener(unsubscribe);
  }, []);

  return (
    <HeaderWrapper as={Animated.View} style={{ height: animatedHeight }}>
      <MapView style={styles.map} region={position}>
        <Marker title="Twoje położenie" coordinate={position}>
          <MaterialCommunityIcons name="tooltip-account" size={26} color="red" />
        </Marker>
      </MapView>
      <ArrowContainer>
        <TouchableOpacity
          onPress={() => {
            startAnimation();
          }}>
          <MaterialCommunityIcons
            name={heightValue === 180 ? 'arrow-down' : 'arrow-up'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </ArrowContainer>
    </HeaderWrapper>
  );
};

export default StoresMap;
