import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';

import { StoreType, ThemeType } from 'types';
import { storeInEditModeState, useRemoveFavoriteStore } from 'store';
import {
  TouchableContainer,
  Name,
  Description,
  InfoContainer,
  IconContainer,
  ButtonsContainer,
  TopContainer,
  Radius,
  RadiusText
} from './index.styles';

interface IProps {
  id: StoreType['id'];
  name: StoreType['name'];
  description: StoreType['description'];
  radius: StoreType['radius'];
  longitude: StoreType['longitude'];
  latitude: StoreType['latitude'];
  address: StoreType['address'];
  color: StoreType['color'];
  updatedAt: StoreType['updatedAt'];
  createdAt: StoreType['createdAt'];
  theme: ThemeType;
}

const StoreListItem: React.FC<IProps> = (props: IProps) => {
  const {
    id,
    name,
    description,
    radius,
    longitude,
    latitude,
    address,
    color,
    updatedAt,
    createdAt,
    theme
  } = props;

  const navigation = useNavigation();
  const removeFavoriteStore = useRemoveFavoriteStore();
  const setStoreInEditMode = useSetRecoilState(storeInEditModeState);

  return (
    <TouchableContainer
      key={id}
      onPress={() => {
        navigation.navigate('AddEditFavoriteStoreScreen', {
          id,
          name,
          description,
          radius,
          longitude,
          latitude,
          address,
          color,
          updatedAt,
          createdAt
        });
        setStoreInEditMode(true);
      }}>
      <>
        <InfoContainer>
          <TopContainer>
            <Name>{name}</Name>
            <Radius>
              <Icon2 name="radius-outline" size={10} />
              <RadiusText>{radius}m</RadiusText>
            </Radius>
          </TopContainer>
          <Description>{description}</Description>
        </InfoContainer>
        <ButtonsContainer>
          <IconContainer noMarginRight onPress={() => removeFavoriteStore(id)}>
            <Icon name="trash" size={22} color={theme.colors.secondary} />
          </IconContainer>
        </ButtonsContainer>
      </>
    </TouchableContainer>
  );
};

export default StoreListItem;
