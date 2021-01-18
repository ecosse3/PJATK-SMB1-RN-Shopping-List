import React, { useEffect, useRef, useState } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilValue } from 'recoil';
import { rgba } from 'polished';

import { ThemeType } from 'types';
import { useGeolocation } from 'hooks/useGeolocation';
import { favoriteStoresState } from 'store/atoms';
import { ArrowContainer, HeaderWrapper } from './index.styles';

interface IStoresMapProps {
  theme: ThemeType;
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const StoresMap: React.FC<IStoresMapProps> = ({ theme }) => {
  const position = useGeolocation();

  const favoriteStores = useRecoilValue(favoriteStoresState);
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
        <Marker key="your-position-marker" title="Twoje położenie" coordinate={position}>
          <MaterialCommunityIcons
            name="tooltip-account"
            size={26}
            color={theme.colors.primary}
          />
        </Marker>
        {favoriteStores.map((store) => (
          <React.Fragment key={`${store.id}${store.color}fragment`}>
            <Marker
              key={`${store.id}${store.color}marker`}
              title={store.name}
              description={store.description}
              coordinate={{ latitude: store.latitude, longitude: store.longitude }}
              pinColor={store.color}
            />
            <Circle
              key={`${store.id}${store.color}circle`}
              center={{ latitude: store.latitude, longitude: store.longitude }}
              radius={store.radius}
              fillColor={rgba(store.color, 0.2)}
              strokeColor={rgba(store.color, 0.5)}
            />
          </React.Fragment>
        ))}
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
