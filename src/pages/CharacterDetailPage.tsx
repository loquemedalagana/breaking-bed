import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CharacterDetail from 'src/components/character_detail/CharacterDetail';

const CharacterDetailPage: React.FC = () => {
  const params = useParams();
  const [characterId, setCharacterId] = useState<string>('');

  useEffect(() => {
    if (params.characterId) {
      setCharacterId(params.characterId);
    }
  }, []);

  // TODO: get character detail data from ID
  return <CharacterDetail characterId={characterId} />;
};

export default CharacterDetailPage;
