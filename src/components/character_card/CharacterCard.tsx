import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import styled from '@emotion/styled';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Table from 'src/components/table/Table';
import Image from 'src/components/image/Image';
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

interface CharacterCardProps {
  character: Character;
  isListItem?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isListItem }) => {
  const { t, i18n } = useTranslation();

  dayjs.locale(i18n.language);
  dayjs.extend(calendar);
  dayjs.extend(localizedFormat);

  const getLocalizeBirthday = (date: Date): string => {
    return dayjs(date, { locale: i18n.language }).format('LL');
  };

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

  const itemNames: any = {
    nickname: t('nickname'),
    status: t('status'),
    birthday: t('birthday'),
    occupation: t('occupation'),
    portrayed: t('portrayed'),
    appearance: t('appearance'),
  };

  const characterInfo = Object.entries(character)
    .filter(([key, value]) => value && itemNames[key] !== undefined)
    .map(([key, value]) => {
      if (key === 'birthday' && character.birthday) {
        return [itemNames[key], getLocalizeBirthday(character.birthday)];
      }
      if (key === 'status' && character.status) {
        return [itemNames[key], getCharacterState(character.status)];
      }
      if (typeof value === 'object') {
        return [itemNames[key], JSON.stringify(value).replace(/(\[|\])|"/g, '')];
      }
      return [itemNames[key], value];
    });

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
              <Table
                id={character.characterId}
                col={2}
                row={1}
                items={[[itemNames.status, getCharacterState(character.status)]]}
              />
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
        <Table id={character.characterId} col={2} row={characterInfo.length} items={characterInfo} />
      </CharacterInfo>
    </DetailPageCardBox>
  );
};

export default CharacterCard;
