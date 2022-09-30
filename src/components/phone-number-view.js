import { Backspace, Phone } from '@mui/icons-material';
import styled from 'styled-components/macro';
import { useTranslation } from '../languages';

export let PhoneButton = styled.button`
  all: unset;

  border: none;
  outline: none;
  background: none;

  border-radius: 50%;
  background-color: #e8e8e8;

  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1;
  font-size: 1.5em;

  &:hover:not(:disabled) {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
  &:disabled {
    filter: grayscale(100%);
    opacity: 0.5;
  }
`;

export let PhoneNumberView = ({ disabled, value, onChange, onCall }) => {
  let t = useTranslation();
  let add_number = (number) => {
    if (disabled) return;

    if (value.length < 14) {
      onChange(value + number);
    } else {
      // Phone number too long
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          color: 'black',
          fontSize: '2em',
          marginTop: 16,
          textAlign: 'center',
          whiteSpace: 'pre',
        }}
      >
        {value === '' ? (
          <span style={{ color: 'gray' }}>{t('Enter Phone Number')}</span>
        ) : (
          <span>+{value}</span>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          maxWidth: 250,
          width: '100%',
          gridTemplate: `
            "one two three"
            "four five six"
            "seven eight nine"
            "backspace  zero call"
            / 1fr 1fr 1fr
          `,
          gap: 12,
          margin: 32,
        }}
      >
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'one' }}
          onClick={() => {
            add_number('1');
          }}
        >
          1
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'two' }}
          onClick={() => {
            add_number('2');
          }}
        >
          2
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'three' }}
          onClick={() => {
            add_number('3');
          }}
        >
          3
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'four' }}
          onClick={() => {
            add_number('4');
          }}
        >
          4
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'five' }}
          onClick={() => {
            add_number('5');
          }}
        >
          5
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'six' }}
          onClick={() => {
            add_number('6');
          }}
        >
          6
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'seven' }}
          onClick={() => {
            add_number('7');
          }}
        >
          7
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'eight' }}
          onClick={() => {
            add_number('8');
          }}
        >
          8
        </PhoneButton>
        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'nine' }}
          onClick={() => {
            add_number('9');
          }}
        >
          9
        </PhoneButton>

        <PhoneButton
          disabled={disabled}
          onClick={() => {
            onChange(value.slice(0, -1));
          }}
          style={{ gridArea: 'backspace', backgroundColor: 'red' }}
        >
          <Backspace style={{ width: 24, height: 24, color: 'white' }} />
        </PhoneButton>

        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'zero' }}
          onClick={() => {
            add_number('0');
          }}
        >
          0
        </PhoneButton>

        <PhoneButton
          disabled={disabled}
          style={{ gridArea: 'call', backgroundColor: 'green' }}
          onClick={() => {
            onCall();
          }}
        >
          <Phone style={{ width: 24, height: 24, color: 'white' }} />
        </PhoneButton>
      </div>
    </div>
  );
};
