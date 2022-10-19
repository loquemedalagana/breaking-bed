import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const SelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.5rem 0.5rem 0.5rem 0.25rem;
  position: relative;
  background: #fff7e9;
  border-radius: 1rem;

  & > input {
    display: none;
  }
`;

const StyledSelectOptions = styled.select`
  background: transparent;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1em;
  border: none;

  &:hover,
  &:focus {
    border: none;
    outline: none;
  }

  & > option:focus {
    border: none;
    outline: none;
  }
`;

const StyledOption = styled.option`
  padding: 0;
`;

interface SelectLanguageProps {}

const SelectLanguage: React.FC<SelectLanguageProps> = () => {
  const { i18n } = useTranslation();
  const handleSelectLanguage = (e: any): void => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <SelectBox>
      <StyledSelectOptions onChange={handleSelectLanguage} defaultValue={i18n.language}>
        <StyledOption value="es">🇪🇸 Es</StyledOption>
        <StyledOption value="en">🇬🇧 En</StyledOption>
      </StyledSelectOptions>
    </SelectBox>
  );
};

export default SelectLanguage;
