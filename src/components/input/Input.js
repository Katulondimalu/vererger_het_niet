import { useTranslation } from '../../languages';
import { InputBox } from '../../assets/styles/Barcode.style';

const Input = ({ setInput }) => {
  const t = useTranslation();
  return (
    <InputBox>
      <input
        type='text'
        onChange={(event) => setInput(event.target.value)}
        placeholder={t('write barcode...')}
      />
    </InputBox>
  );
};

export default Input;
