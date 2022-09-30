/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { InfoRounded } from '@mui/icons-material'
import { useEffect } from 'react'
import { orderBy, sortBy } from 'lodash'

const EndScreen = ({ scoreAllPlayer, handleShowInstruction }) => {
  let navigate = useNavigate()
  let t = useTranslation('nl')

  useEffect(() => {}, [])

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
        <Whitespace height={20} />
        <h2>Score Summary</h2>
        <Whitespace height={20} />
        {Object.entries(scoreAllPlayer).map((arr, key) => {
          return (
            <div key={key}>
              <h2>Round {key + 1}</h2>
              <Whitespace height={20} />
              <TableContainer
                component={Paper}
                sx={{
                  border: '1px solid var(--button-color)',
                  borderRadius: 2,
                  maxHeight: 350,
                }}
                key={key}
              >
                <Table size="small" aria-label="a dense table" stickyHeader>
                  <TableHead>
                    <TableRow sx={{ 'th,tr,td': {} }}>
                      <TableCell align="left">{t('Rank')}</TableCell>
                      <TableCell align="center">{t('Name')}</TableCell>
                      <TableCell align="center">{t('Score Total')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderBy(
                      Object.entries(arr[1].scores.players),
                      (x) => x[1].undercover + x[1].theme,
                      'desc'
                    ).map((arr2, key2) => {
                      return (
                        <TableRow
                          key={key2}
                          sx={{
                            '&:last-child td, &:last-child th,tr,td': {
                              border: 0,
                            },
                          }}
                          hover={true}
                        >
                          <TableCell
                            align="left"
                            sx={{
                              color: 'var(--button-color)',
                              fontWeight: 'bold',
                            }}
                          >
                            #{key2 + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: 'var(--button-color)',
                              fontWeight: 'bold',
                            }}
                          >
                            {arr2[1].name}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: 'var(--button-color)',
                              fontWeight: 'bold',
                            }}
                          >
                            {arr2[1].theme + arr2[1].undercover}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Whitespace height={20} />
            </div>
          )
        })}
      </div>

      <div>
        <Whitespace height={20} />
        <ButtonRadiusPrimary onClick={() => window.location.replace(`/`)}>
          {t('Finish Game')}
        </ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default EndScreen
