import { ArrowForward } from '@mui/icons-material';
import React, { useState } from 'react';
import { SKIP_VIDEO_TIMEOUT } from '../../constant/StaticData';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { useTimeout } from '../../utils/use';
import { DevButton } from '../DevButton';
import Video from '../Video';

const PrevideoScreen = ({ onNext, url }) => {
  let is_timeout = useTimeout(SKIP_VIDEO_TIMEOUT);
  let [is_done_watching, set_is_done_watching] = useState(false);
  let t = useTranslation();

  return (
    <div
      style={{
        margin: 16,
        height: '100%',
        position: 'relative',
      }}
    >
      <DevButton onClick={onNext} />

      <div>{t('Watch the video to continue to the next step.')}</div>
      <Whitespace height={16} />
      <Video
        url={url}
        onNext={() => {
          set_is_done_watching(true);
        }}
      />

      {is_done_watching ? (
        <button
          onClick={onNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
          }}
        >
          {t('Continue')}
          <Whitespace width={8} />
          <ArrowForward style={{ transform: 'translateY(1px)' }} />
        </button>
      ) : is_timeout ? (
        <button style={{ position: 'absolute', bottom: 0 }} onClick={onNext}>
          {t('Skip video')}
        </button>
      ) : null}
    </div>
  );
};

export default PrevideoScreen;
