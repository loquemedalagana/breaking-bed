import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as dayjs from 'dayjs';
import calender from 'dayjs/plugin/calendar';
import styled from '@emotion/styled';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Image from "src/components/image/Image";
import { DEVICE_MOBILE_WIDTH } from 'src/device/devices';
import Character from 'src/models/Character';
import { URL_CHARACTERS } from 'src/routes/routeURL';

const CardBox = styled(MuiCard)`
  display: flex;
  background: #d7e9f7;
  flex-direction: column;
  width: 100%;
`;

const CardButtonBox = styled(CardActionArea)`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  @media screen and (max-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    padding: 2rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const ListPageCardBox = styled(CardBox)``;

const DetailPageCardBox = styled(CardBox)`
  @media screen and (min-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    flex-direction: row;
  }
`;

const CharacterInfo = styled(CardContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    width: 100%;
  }
`;

const Table = styled(MuiTable)`
  align-self: center;
  @media screen and (min-width: ${DEVICE_MOBILE_WIDTH + 1}px) {
    width: 100%;
  }
`;

interface CharacterCardProps {
  character: Character;
  isListItem?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isListItem }) => {
  const { t } = useTranslation();

  dayjs.locale('en');
  dayjs.extend(calender);

  const getCharacterState = (state: string): string => {
    switch (state) {
      case 'alive':
        return t('alive');
      case 'deceased':
        return t('deceased');
      case 'presumed dead':
        return t('presumed dead');
      default:
        return t('unknown');
    }
  };

  if (isListItem) {
    return (
      <ListPageCardBox id={`character-list-item-${character.characterId}`}>
        <StyledLink to={`${URL_CHARACTERS}/${character.characterId}`}>
          <CardButtonBox id={`goto-character-detail-${character.characterId}`}>
            <Image src={character.img} alt={character.name} />
            <CharacterInfo>
              <Typography gutterBottom align="center" variant="h5" component="div">
                {character.name}
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>{t('status')}</TableCell>
                    <TableCell align="right">{getCharacterState(character.status)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CharacterInfo>
          </CardButtonBox>
        </StyledLink>
      </ListPageCardBox>
    );
  }

  return (
    <DetailPageCardBox id={`character-detail-${character.characterId}`}>
      <Image src={character.img} alt={character.name} />
      <CharacterInfo>
        <Typography id={`character-name-${character.name}`} gutterBottom align="center" variant="h5" component="div">
          {character.name}
        </Typography>
        <Table size="small">
          <TableBody>
            {character.nickname && (
              <TableRow>
                <TableCell>{t('nickname')}</TableCell>
                <TableCell align="right">{character.nickname}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>{t('status')}</TableCell>
              <TableCell align="right">{getCharacterState(character.status)}</TableCell>
            </TableRow>
            {character.birthday && (
              <TableRow>
                <TableCell>{t('birthday')}</TableCell>
                <TableCell align="right">{character.birthday?.toDateString()}</TableCell>
              </TableRow>
            )}
            {character.occupation && (
              <TableRow>
                <TableCell>{t('occupations')}</TableCell>
                <TableCell align="right">{character.occupation?.join(', ')}</TableCell>
              </TableRow>
            )}
            {character.portrayed && (
              <TableRow>
                <TableCell>{t('portrayed')}</TableCell>
                <TableCell align="right">{character.portrayed}</TableCell>
              </TableRow>
            )}
            {character.appearance && (
              <TableRow>
                <TableCell>{t('appearance')}</TableCell>
                <TableCell align="right">{character.appearance.join(', ')}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CharacterInfo>
    </DetailPageCardBox>
  );
};

export default CharacterCard;
