import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ICharacter } from '../../../../data/apiTypes';
import { AppContext } from '../../../../store/context';
import { shuffleArray } from '../../../../utils/functions';
import MyButton from '../../../UI/button/MyButton';

const CardInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const { characterData, quotesData } = state.apiPage;

  const [quote, setQuote] = useState<string | null>(null);

  const characters = characterData.docs.filter((char) => {
    return char._id === id;
  });

  useEffect(() => {
    if (characters.length === 0) {
      navigate(`/`);
    }
  }, [characters, navigate]);

  const character = characters[0];

  const filteredQuotes = quotesData.filter((quote) => quote.character === id);

  const refreshQuote = () => {
    let randomQuote: string | null;
    if (filteredQuotes?.length) {
      shuffleArray(filteredQuotes);
      randomQuote = filteredQuotes[0].dialog;
    } else {
      randomQuote = null;
    }
    setQuote(randomQuote);
  };

  useEffect(() => {
    refreshQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderInfo = (info: keyof ICharacter) => {
    if (!character?.[info].length || character?.[info] === 'NaN') {
      return (
        <div>
          {info}: <span>Unknown</span>
        </div>
      );
    }
    return (
      <div>
        {info}: <span>{character?.[info]}</span>
      </div>
    );
  };

  return (
    <div className="card-info container">
      <div className="card-info__navigation">
        <div>Main / cards / {id}</div>
        <Link to="/">
          <MyButton data-testid="btn-test-back">Back</MyButton>
        </Link>
      </div>

      <div className="card-info__content">
        <div className="modal__header">
          <h2>Character</h2>
        </div>
        <div className="modal__body">
          <div className="modal__body-left">
            {renderInfo('name')}
            {renderInfo('race')}
            {renderInfo('birth')}
            {renderInfo('death')}
          </div>
          <div className="modal__body-right">
            {renderInfo('gender')}
            {renderInfo('hair')}
            {renderInfo('height')}
            {renderInfo('spouse')}
          </div>
        </div>
        {quote && (
          <div className="modal__body-quotes">
            <blockquote className="blockquote">{quote}</blockquote>
            <FontAwesomeIcon
              className="quote-refresh"
              icon={faArrowsRotate}
              onClick={(e) => {
                const svg = e.target as SVGElement;
                svg.classList.toggle('rotate');
                refreshQuote();
              }}
              data-testid="refresh-quote-test"
            />
          </div>
        )}
        <div className="modal__body-more">
          <a href={character?.wikiUrl} target="_blank" rel="noreferrer">
            more info...
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
