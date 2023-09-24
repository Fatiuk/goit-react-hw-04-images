import styled from 'styled-components';

export const ButtonLoadMore = styled.button`
  padding: 8px 16px;
  margin-top: 40px;
  border-radius: 6px;
  background-color: transparent;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #464748;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0 0 5px 0.1px #464748;
  &:hover {
    color: white;
    background-color: #b58e3f;
  }
`;
