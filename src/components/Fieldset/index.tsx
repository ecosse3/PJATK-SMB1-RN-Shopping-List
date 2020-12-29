import React from 'react';
import { Content, FieldsetView, Title } from './index.styles';

interface IFieldsetProps {
  title: string;
}

export const Fieldset: React.FC<IFieldsetProps> = ({ title, children }) => {
  return (
    <FieldsetView>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </FieldsetView>
  );
};
