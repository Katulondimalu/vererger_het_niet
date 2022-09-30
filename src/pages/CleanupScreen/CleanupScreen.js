import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import { Titlebar } from '../../assets/styles/Common.style';
import Topbar from '../../components/topbar/Topbar';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';

const CleanupScreen = ({ to }) => {
  let t = useTranslation('nl');
  let navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar />

      <div style={{ margin: 16 }}>
        <Titlebar>{t('Cleanup Instructions')}</Titlebar>
        <Whitespace height={16} />
        <div style={{ width: '100%', objectFit: 'contain' }}>
                {t('CleanUpText1')}
                <p>&nbsp;</p>
        </div>
        <Whitespace height={16} />    
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplate: `
            "a"
            "b"
            "c"
            "d"
            "e"
            "f"
            "g"
            "h"
            / 1fr
          `,
          }}
        >
          {assets.images.cleanups?.map((icon, i) => (
            <div key={i}>
              <img
                src={icon}
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: 10,
                }}
                alt='icon'
              />
              <div style={{ width: '100%', objectFit: 'contain' }}>
                {t('CleanUpText1')}
                <p>&nbsp;</p>
              </div>
            </div>
          ))}
        </div>
        <Whitespace height={16} />
        {to && (
          <button
            onClick={() => {
              navigate(`${to}`);
            }}
          >
            {t('Done')}
          </button>
        )}
        <Whitespace height={16} />
      </div>
    </div>
  );
};

export default CleanupScreen;
