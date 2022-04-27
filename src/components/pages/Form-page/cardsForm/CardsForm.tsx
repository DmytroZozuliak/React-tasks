import React from 'react';
import { PersonCard } from '../../../../interfaces';

interface Props {
  cards: PersonCard[];
}
const CardsForm: React.FC<Props> = ({ cards }) => {
  return (
    <ul className="miniCards">
      {cards.length > 0 &&
        cards.map((card, index) => {
          return (
            <li className="miniCard" key={index} data-testid="form-card">
              {card.img && <img src={card.img} alt="avatar" />}
              <div className="info">
                <span>
                  name: <span>{card.name}</span>
                </span>
                <span>
                  surname: <span>{card.surname}</span>
                </span>
                <span>
                  date of birth: <span>{card.date}</span>
                </span>
                <span>
                  country: <span>{card.country}</span>
                </span>
                <span>
                  data processing: <span>{card.dataProcessing ? 'agree' : 'dont agree'}</span>
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CardsForm;
