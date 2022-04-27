import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICharacter } from '../../../../data/apiTypes';

interface Props {
  characters: ICharacter[];
}

const CharacterCards = (props: Props) => {
  const { characters } = props;
  const navigate = useNavigate();

  return characters.length > 0 ? (
    <div className="character-cards">
      {characters.map((info) => {
        return (
          <div
            className="character-card"
            key={info._id}
            onClick={() => {
              navigate(`/cards/${info._id}`);
            }}
            data-testid="character-card-test"
          >
            <div>
              name: <span>{info.name}</span>
            </div>
            <div>
              race:
              <span>{info.race !== 'NaN' ? info.race : 'Unknown'}</span>
            </div>
            <div>
              gender:
              <span>{info.gender !== 'NaN' ? info.gender : 'Unknown'}</span>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div>No matches</div>
  );
};

export default CharacterCards;
