import { immerable } from 'immer';

export interface ServerCharacterData {
  char_id: number;
  name: string;
  birthday: string | 'Unknown';
  occupation: string[] | ['Unknown'];
  img: string;
  status: string;
  nickname: string;
  appearance: number[];
  portrayed: string | 'Unknown';
  category: string;
  better_call_saul_appearance: number[];
}

class Character {
  [immerable] = true;
  characterId: number;
  name: string;
  birthday: Date | undefined;
  occupation: string[] | undefined;
  img: string;
  status: 'alive' | 'deceased' | 'presumed dead' | string;
  nickname: string | undefined;
  appearance: number[];
  portrayed: string | undefined;
  categories: string[];
  betterCallSaulAppearance: number[];

  constructor(data: ServerCharacterData) {
    this.characterId = data.char_id;
    this.name = data.name;
    this.birthday = this.getBirthday(data.birthday);
    this.occupation = data.occupation[0] === 'Unknown' ? undefined : data.occupation;
    this.img = data.img;
    this.status = data.status.toLowerCase();
    this.nickname = data.nickname === 'Unknown' ? undefined : data.nickname;
    this.appearance = data.appearance;
    this.portrayed = data.portrayed === 'Unknown' ? undefined : data.portrayed;
    this.categories = data.category.split(', ');
    this.betterCallSaulAppearance = data.better_call_saul_appearance;
  }

  private getBirthday(birthdayData: string): Date | undefined {
    if (birthdayData === 'Unknown') {
      return undefined;
    }
    return new Date(birthdayData.replace(/-/g, '/'));
  }
}

export default Character;
