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

const Instructions = ({ onNext }) => {
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
      <InstructionContent>
        In de Microsoft Escape game word je in de MediaMarkt naar vier 
        verschillende locaties gestuurd. Hiervoor doorloop je telkens 
        de volgende stappen:
        </InstructionContent>
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
        <InstructionStep>Stap 1.</InstructionStep>
        <InstructionContent>Bekijk het filmpje in de app.</InstructionContent>
        <InstructionStep>Stap 2.</InstructionStep>
        <InstructionContent>
          Los de puzzel op. Voor elke puzzel moet je een onderdeel uit de GamifiCase
          combineren met informatie uit de app.
        </InstructionContent>
        <InstructionContent>
          Heb je wat hulp nodig? Er zitten hints in de app om je te helpen!
        </InstructionContent>
        <InstructionStep>Stap 3.</InstructionStep>
        <InstructionContent>
          De oplossing van de puzzel is een product in de MediaMarkt. Ga naar
          dit product toe. Heb je wat hulp nodig? Of kan je het product niet
          vinden? Pak een hint!
        </InstructionContent>
        <InstructionStep>Stap 4.</InstructionStep>
        <InstructionContent>
          Scan hier de barcode van het product of scan de #WorkSmartPlayHard
          sticker.
        </InstructionContent>
        <InstructionContent>
          Als de product variant niet is aangegeven kan elke variant van het
          product gescand worden.
        </InstructionContent>
        <InstructionContent>
          Let op, soms hebben producten meerdere barcodes. Werkt eentje niet?
          Probeer een ander.
        </InstructionContent>
        <InstructionContent>
          <img src={assets.images.common?.StartInstruction} alt='' />
        </InstructionContent>
        <InstructionContent>
          Ben je er klaar voor? Vanaf het volgende scherm start de tijd! Succes!
        </InstructionContent>
        <Whitespace height={16} />
        <button onClick={onNext}>{t('Continue')}</button>
        <Whitespace height={16} />
      </div>
    </div>
  );
};

export default Instructions;
