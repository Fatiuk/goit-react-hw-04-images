import React from 'react';
import { ButtonLoadMore } from './Button,styled';

function Button({ onClick }) {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load More
    </ButtonLoadMore>
  );
}

export default Button;
