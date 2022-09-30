import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { format } from 'date-fns';
import { equalTo, orderByChild, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LeaderBoardHeadingText,
  LeaderBoardText,
  LeaderBoardWrapper,
  NoRoomContainer,
} from '../../assets/styles/Leaderboard.style';
import TimeThingy from '../../components/time/TimeThingly';
import Topbar from '../../components/topbar/Topbar';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { database, useFirebase } from '../../utils/firebase.js';
import { roomPosition, sortedRoomsByScore } from '../../utils/sortedData';

const LeaderBoard = ({ to, scoreboard }) => {
  let { id } = useParams();
  let room_ref = ref(database, `rooms/${id}`);
  let room = useFirebase(room_ref) ?? {};
  let navigate = useNavigate();
  let t = useTranslation('nl');
  const [rooms, setRooms] = useState([]);
  const [roomData, setroomData] = useState(undefined);
  // fetch rooms by today's date
  const today_rooms = useFirebase(
    query(
      ref(database, `rooms`),
      orderByChild(`date`),
      equalTo(`${format(new Date(), 'dd-MM-yyyy')}`)
    )
  );
  useEffect(() => {
    if (today_rooms === undefined || today_rooms === null) return;
    setRooms(sortedRoomsByScore(today_rooms));
  }, [id, today_rooms]);
  useEffect(() => {
    if (!scoreboard) setroomData(roomPosition(rooms, id));
  }, [id, rooms, scoreboard]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      {!scoreboard && (
        <Topbar>
          <TimeThingy room={room} />
        </Topbar>
      )}
      <Whitespace height={16} />
      <LeaderBoardWrapper>
        {!scoreboard && (
          <>
            <LeaderBoardText>
              {t('Your Time')}
              {roomData &&
                roomData.currentRoom &&
                format(
                  roomData.currentRoom.total_time_spent_score * 1000,
                  'mm:ss'
                )}
            </LeaderBoardText>
            <LeaderBoardText>
              {t('Rank')} #{roomData && roomData.roomIndex}
            </LeaderBoardText>
          </>
        )}
        <LeaderBoardHeadingText>{t('Daily Leadrboard')}</LeaderBoardHeadingText>
        <Whitespace height={6} />
        {rooms.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              border: '1px solid var(--button-color)',
              borderRadius: 2,
              maxHeight: 350,
            }}
          >
            <Table size='small' aria-label='a dense table' stickyHeader>
              <TableHead>
                <TableRow sx={{ 'th,tr,td': {} }}>
                  <TableCell align='left'>{t('Rank')}</TableCell>
                  <TableCell align='center'>{t('Name')}</TableCell>
                  <TableCell align='center'>{t('Time')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms &&
                  rooms.map((room, index) =>
                    id && room.id === id ? (
                      <TableRow
                        key={room.id}
                        sx={{
                          '&:last-child td, &:last-child th,tr,td': {
                            border: 0,
                          },
                        }}
                        hover={true}
                      >
                        <TableCell
                          align='left'
                          sx={{
                            color: 'var(--button-color)',
                            fontWeight: 'bold',
                          }}
                        >
                          #{index + 1}
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            color: 'var(--button-color)',
                            fontWeight: 'bold',
                          }}
                        >
                          {room.team_name}
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            color: 'var(--button-color)',
                            fontWeight: 'bold',
                          }}
                        >
                          {room.total_time_spent_score &&
                            format(room.total_time_spent_score * 1000, 'mm:ss')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow
                        key={room.id}
                        sx={{
                          '&:last-child td, &:last-child th,tr,td': {
                            border: 0,
                          },
                        }}
                        hover={true}
                      >
                        <TableCell align='left'>#{index + 1}</TableCell>
                        <TableCell align='center'>{room.team_name}</TableCell>
                        <TableCell align='center'>
                          {room.total_time_spent_score &&
                            format(room.total_time_spent_score * 1000, 'mm:ss')}
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <NoRoomContainer>{t('No rooms found for today')}</NoRoomContainer>
        )}
      </LeaderBoardWrapper>
      <Whitespace height={16} />
      <button onClick={() => navigate(to)}>{t('Continue')}</button>
    </div>
  );
};

export default LeaderBoard;
