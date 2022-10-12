import * as React from 'react';
import * as dayjs from 'dayjs';
import calender from 'dayjs/plugin/calendar';
import styled from '@emotion/styled';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// TODO: this will be used in the list
// import { CardActionArea } from '@mui/material';

import Character from 'src/models/Character';
import { DEVICE_MOBILE_WIDTH } from 'src/device/devices';

const CardBox = styled(MuiCard)`
  display: flex;
  background: #d7e9f7;
  flex-direction: column;
  width: 100%;
`;

const DetailPageCardBox = styled(CardBox)`
  @media screen and (min-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    flex-direction: row;
  }
`;

const CardImage = styled.img`
  @media screen and (min-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    max-width: 50%;
  }
`;

interface CharacterCardProps {
  character: Character;
  isListItem?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isListItem }) => {
  // TODO: es should be added
  dayjs.locale('en');
  dayjs.extend(calender);

  return (
    <DetailPageCardBox>
      <CardImage src={character.img} alt={character.name} />
      <CardContent>
        <Typography gutterBottom align="center" variant="h5" component="div">
          {character.name}
        </Typography>
        <Table size="small">
          <TableBody>
            {character.nickname && (
              <TableRow>
                <TableCell>nickname</TableCell>
                <TableCell align="right">{character.nickname}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>status</TableCell>
              <TableCell align="right">{character.status}</TableCell>
            </TableRow>
            {character.birthday && (
              <TableRow>
                <TableCell>birthday</TableCell>
                <TableCell align="right">{character.birthday?.toDateString()}</TableCell>
              </TableRow>
            )}
            {character.occupation && (
              <TableRow>
                <TableCell>occupations</TableCell>
                <TableCell align="right">{character.occupation?.join(', ')}</TableCell>
              </TableRow>
            )}
            {character.portrayed && (
              <TableRow>
                <TableCell>portrayed</TableCell>
                <TableCell align="right">{character.portrayed}</TableCell>
              </TableRow>
            )}
            {character.appearance && (
              <TableRow>
                <TableCell>appearance</TableCell>
                <TableCell align="right">{character.appearance.join(', ')}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </DetailPageCardBox>
  );
};

export default CharacterCard;
