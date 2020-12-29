import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import {
  TouchableContainer,
  Name,
  Description,
  InfoContainer,
  IconContainer,
  ButtonsContainer,
  TopContainer
} from './index.styles';
import { StoreType, ThemeType } from '../../utils/types';
import { storeInEditModeState, useRemoveFavoriteStore } from '../../store';

interface IProps {
  id: StoreType['id'];
  name: StoreType['name'];
  description: StoreType['description'];
  radius: StoreType['radius'];
  longitude: StoreType['longitude'];
  latitude: StoreType['latitude'];
  theme: ThemeType;
}

const StoreListItem: React.FC<IProps> = (props: IProps) => {
  const { id, name, description, radius, longitude, latitude, theme } = props;

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
          latitude
        });
        setStoreInEditMode(true);
      }}>
      <>
        <InfoContainer>
          <TopContainer>
            <Name>{name}</Name>
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
