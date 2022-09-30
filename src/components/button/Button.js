import { ButtonBox } from '../../assets/styles/Barcode.style';

const Button = ({ children, onSubmit }) => {
  return (
    <ButtonBox onClick={onSubmit}>
      <span onClick={onSubmit}>{children}</span>
    </ButtonBox>
  );
};

export default Button;
