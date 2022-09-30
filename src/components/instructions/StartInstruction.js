import React from 'react';
import assets from '../../assets';
import {
  InstructionContent,
  InstructionHeader,
  InstructionStep,
} from '../../assets/styles/Instruction';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { DevButton } from '../DevButton';

const StartInstruction = ({ onNext }) => {
  let t = useTranslation();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        textAlign: 'center',
      }}
    >
      <DevButton onClick={onNext} />
      <Whitespace height={16} />
      <InstructionHeader>Start Instructies</InstructionHeader>
      <div
        style={{
          //paddingTop:25,
          paddingLeft: 15,
          paddingRight: 15,
          //paddingBottom:25,
          display: 'flex',
          flexDirection: 'column',
          marginTop: 25,
          arginBottom: 25,
        }}
      >
        <InstructionContent>
          Welkom bij de Microsoft escape game. De escape game is een multimedia
          ervaring die gespeeld wordt met behulp van je telefoon en een
          GamifiCase. Zijn jullie het snelst?
        </InstructionContent>
        <InstructionContent>
          Ga naar de Smartbar op de eerste verdieping om de GamifiCase op te halen en het spel te
          beginnen.
        </InstructionContent>
        <Whitespace height={40} />
        <InstructionContent>
          <img
            src={assets.images.common?.SmartBar}
            alt=''
            width={250}
            height={180}
          />
        </InstructionContent>
        <InstructionStep>Spelregels</InstructionStep>
        <InstructionContent>
          Maak geen aantekeningen op de GamifiCase of op de spullen die er in
          zitten.
        </InstructionContent>
        <InstructionContent>
          Breng de GamifiCase met alle spullen terug naar de Smartbar na het
          spelen van het spel.
        </InstructionContent>
        <InstructionContent>
          Aan het eind van de game kan je meedoen aan een loterij om een Xbox te
          winnen, hiervoor geldt maximaal een deelname per persoon.
        </InstructionContent>
        <Whitespace height={20} />
        <InstructionContent>
          <img
            src={assets.images.common?.RetrieveCase}
            alt=''
            width={250}
            height={180}
          />
        </InstructionContent>
        <Whitespace height={16} />
        <button onClick={onNext}>{t('Continue')}</button>
        <Whitespace height={16} />
      </div>
    </div>
  );
};

export default StartInstruction;
