import { IosShare, PhotoCamera } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import ReactImageProcess from 'react-image-process';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import Topbar from '../../components/topbar/Topbar';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { getDimenssion } from '../../utils/helper';

const SelfieAndPostScreen = ({ to }) => {
  let t = useTranslation();
  let navigate = useNavigate();
  /** @type {MutableRefObject<HTMLInputElement>} */
  let input_ref = useRef();
  const [image, setimage] = useState(null);
  let [file_and_dataurl, set_file] = useState(null);
  const [dimension, setDimension] = useState({});
  const [socialLink, setsocialLink] = useState(false);
  const ref = useRef();
  const imgRef = useRef();
  const onChange = async (event) => {
    try {
      if (event.target.files.length > 0) {
        await getDimenssion(event, setDimension);
        let file = event.target.files[0];
        setimage(URL.createObjectURL(file));
        let reader = new FileReader();
        reader.onload = function (e) {
          set_file([file, e.target.result]);
        };
        reader.readAsDataURL(file);
        setTimeout(() => {
          setsocialLink(true);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Topbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>
          {t('If you cannot be a star in the sky, be a light in your house.')}
        </h2>
        <Whitespace height={16} />
        {file_and_dataurl == null ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 200px',
              backgroundColor: '#e9e9e9',
            }}
            onClick={() => {
              input_ref.current.click();
            }}
          >
            <PhotoCamera />
            <div style={{ width: 8 }} />
            <div>{t('Snap a picture')}</div>
          </div>
        ) : image !== null ? (
          <ReactImageProcess
            mode='waterMark'
            waterMarkType='image'
            waterMark={assets.images.common.watermark}
            width={dimension.width ? dimension.width : dimension.width}
            height={dimension.height ? dimension.height : dimension.height}
            // width={dimension.width}
            // height={dimension.height}
            // width={4000}
            // height={2800}
            opacity={1}
            coordinate={[0, 0]}
            ref={ref}
          >
            <img
              style={{
                width: '328px',
              }}
              src={image}
              alt='icon'
              ref={imgRef}
            />
            {socialLink && (
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 200px',
                  color: `white`,
                  cursor: 'pointer',
                }}
                href='#'
                onClick={async () => {
                  const base64url = ref.current?.currentImgNodes[0]?.src;
                  const blob = await (await fetch(base64url)).blob();
                  const file = new File([blob], `${Date.now()}.png`, {
                    type: blob.type,
                  });
                  navigator.share({
                    title: 'Selfie',
                    text: 'Check out this image!',
                    files: [file],
                  });
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,.8)',
                    borderRadius: 20,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: -imgRef.current?.clientHeight,
                  }}
                >
                  <IosShare />
                  <div style={{ width: 8 }} />
                  {t('Share Picture')}
                </div>
              </span>
            )}
          </ReactImageProcess>
        ) : (
          ''
        )}
        <input
          style={{ display: 'none' }}
          type='file'
          accept='image/*'
          onChange={onChange}
          ref={input_ref}
        />

        <img
          src={assets.images.common.MicrosoftIcon}
          style={{
            width: '100%',
            padding: 16,
            maxWidth: 250,
            alignSelf: `center`,
            transform: `translateY(10px)`,
          }}
          alt='icon'
        />
        <img
          src={assets.images.common.WindowsIcon}
          style={{
            width: '100%',
            padding: 16,
            marginTop: -30,
            maxWidth: 230,
            alignSelf: `center`,
            transform: `translateY(10px)`,
          }}
          alt='icon'
        />
        <img
          src={assets.images.common.XboxIcon}
          style={{
            width: '100%',
            padding: 16,
            marginTop: -50,
            maxWidth: 190,
            alignSelf: `center`,
            transform: `translateY(10px)`,
          }}
          alt='icon'
        />
        <Whitespace height={25} />
        <button onClick={() => navigate(`${to}`)}>
          {t('Cleanup Instructions')}
        </button>
      </div>
    </div>
  );
};

export default SelfieAndPostScreen;
