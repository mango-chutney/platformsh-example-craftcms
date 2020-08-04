import styled from 'styled-components';
import { darken } from 'polished';
import get from 'lodash/get';
import defaultTheme from './styles';

const InputComponent = styled.input`
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 9001;

  &[disabled] {
    cursor: not-allowed;
  }

  :checked + ${({ InputDecoratorComponent }) => InputDecoratorComponent} {
    &::before,
    &::after {
      left: 0;
      top: 0;
    }

    &::before {
      background: ${({ theme }) =>
        get(theme, 'checkbox.activeBackgroundColor')};
      border-color: ${({ theme }) =>
        darken(0.05, get(theme, 'checkbox.activeBackgroundColor'))};
      transition: background-color 0.3s;
    }

    &::after {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSd4TWlkWU1pZCcgd2lkdGg9JzE2LjUnIGhlaWdodD0nMTUnIHZpZXdCb3g9JzAgMCAxNi41IDE1Jz48cGF0aCBmaWxsPScjZmZmJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGQ9J00xNi41MTUsMS4wNzEgQzE2LjM5OSwwLjgyNyAxNS45MTQsLTAuMDMwIDE1LjUxNSwwLjAwMSBDMTQuMjg5LDAuNzY1IDEyLjY5MywyLjM1NCAxMS42MzgsMy4zNjIgQzkuNTI4LDUuMzc4IDcuNTAzLDcuNDg2IDUuNTA4LDkuNjI0IEwxLjUxNiw1Ljg5NyBMMC4wMDUsNy40ODYgQzIuMjAwLDkuODM3IDQuNTY3LDEyLjM3MyA2LjUwNSwxNS4wMDAgQzguOTg2LDEwLjYzMiAxMy4wMzUsNC4zNzAgMTYuNTE1LDEuMDcxIEwxNi41MTUsMS4wNzEgWicvPjwvc3ZnPg==');
      background-position: 50% 40%;
      background-repeat: no-repeat;
      background-size: 70%;
      content: '';
      transform: scale(1);
      transition: all 0.25s;
    }
  }
`;

InputComponent.defaultProps = {
  theme: defaultTheme,
};

export default InputComponent;
