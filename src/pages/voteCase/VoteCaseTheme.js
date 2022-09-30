import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

const VoteCaseTheme = ({
  onNext,
  caseNow,
  cases,
  meData,
  handleShowInstruction,
}) => {
  let navigate = useNavigate()
  let t = useTranslation('nl')

  const [theme, setTheme] = useState('')
  let [caseTheme, setCaseTheme] = useState([])

  const handleChange = (event) => {
    setTheme(event.target.value)
  }

  useEffect(() => {
    let returnArr = []
    Object.entries(cases).forEach((arr) => {
      returnArr.push(arr[1].theme)
    })
    setCaseTheme(returnArr)
  }, [cases])

  const handleSubmit = () => {
    if (theme === '') {
      alert('please choose one')
    } else {
      onNext(theme)
    }
  }

  return (
    <div
      className="height-height"
      style={{
        justifyContent: 'space-between',
        overflow: 'scroll',
        paddingBottom: 20,
        textAlign: 'center',
        marginLeft: 16,
        marginRight: 16,
      }}
    >
      <div>
        <div style={{ textAlign: 'right' }}>
          <Fab
            aria-label="save"
            color="primary"
            style={{ background: '#004384' }}
            onClick={handleShowInstruction}
          >
            <InfoRounded />
          </Fab>
        </div>
        <h2>{meData.name}</h2>
        <Whitespace height={20} />
        <img
          // @ts-ignore
          src={assets.images.character.player3}
          style={{
            width: '30%',
            alignSelf: 'center',
            backgroundColor: `var(--background-color)`,
          }}
          alt="icon"
        />
        <Whitespace height={20} />
        <p>
          {t(
            `Take the phone and vote on what problem you think ${caseNow[0]} has:`
          )}
        </p>

        <Whitespace height={20} />
        <p>{t('label select problem')}</p>
        <Whitespace height={20} />
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">
            {t('Choose Theme')}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme}
            label={t('Choose Theme')}
            onChange={handleChange}
          >
            {caseTheme.map((arr, key) => {
              return (
                <MenuItem value={arr.key} key={key}>
                  {arr.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>

      <div>
        <Whitespace height={20} />
        <ButtonRadiusPrimary onClick={() => handleSubmit()}>
          {t('vote')}
        </ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default VoteCaseTheme
