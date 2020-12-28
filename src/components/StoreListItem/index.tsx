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
import { productInEditModeState, useRemoveFavoriteStore } from '../../store';

interface IProps {
  id: StoreType['id'];
  name: StoreType['name'];
  description: StoreType['description'];
  theme: ThemeType;
}

const StoreListItem: React.FC<IProps> = (props: IProps) => {
  const { id, name, description, theme } = props;

  const navigation = useNavigation();
  const removeFavoriteStore = useRemoveFavoriteStore();
  const setProductInEditMode = useSetRecoilState(productInEditModeState);

  return (
    <TouchableContainer
      key={id}
      onPress={() => {
        navigation.navigate('AddEditFavoriteStoreScreen', {
          id,
          name
        });
        setProductInEditMode(true);
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
