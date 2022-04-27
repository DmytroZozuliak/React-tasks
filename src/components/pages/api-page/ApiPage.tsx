import React, { useContext, useEffect, useState } from 'react';
import { getAllCharactersFilters, getAllQuotes } from '../../../data/apiMethods';
import { AppContext } from '../../../store/context';
import { Types } from '../../../store/reducers';
import Spinner from '../../UI/spinner/Spinner';
import CharacterCards from './CharacterCards/CharacterCards';
import CharacterNavigation from './CharacterNavigation/CharacterNavigation';
import Pagination from './Pagination/Pagination';

type Language = 'human' | 'elves' | 'hobbits' | 'dwarfs' | 'mordor';

const ApiPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { characterData, quotesData, searchValue } = state.apiPage;

  const [language, setLanguage] = useState<Language>('human');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // fetching characters
  const fetchCharacters = async () => {
    try {
      const chractersPagination = await getAllCharactersFilters(
        searchValue,
        characterData.limit,
        characterData.page,
        characterData.sort,
        characterData.sortBy
      );

      if (typeof chractersPagination === 'number') {
        if (chractersPagination === 429) {
          throw 'too many requests';
        } else {
          throw 'Could not get data';
        }
      }
      if (chractersPagination.page > chractersPagination.pages) {
        dispatch({
          type: Types.SetCharactersData,
          payload: {
            ...characterData,
            page: chractersPagination.pages,
          },
        });
      } else {
        dispatch({
          type: Types.SetCharactersData,
          payload: {
            ...characterData,
            docs: chractersPagination.docs,
            pages: chractersPagination.pages,
          },
        });
      }
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Could not get data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterData.page, characterData.limit, characterData.sort, characterData.sortBy]);

  // fetching quotes
  useEffect(() => {
    let didCancel = false;
    const fetch = async () => {
      try {
        const allQuotesApi = await getAllQuotes();
        if (typeof allQuotesApi === 'number') {
          if (allQuotesApi === 429) {
            throw 'too many requests';
          } else {
            throw 'Could not get data';
          }
        }
        if (!didCancel) {
          dispatch({ type: Types.SetAllQuotes, payload: allQuotesApi });
        }
      } catch (error) {
        if (typeof error === 'string') {
          setError(error);
        } else {
          setError('Could not get data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (quotesData.length === 0) {
      fetch();
    } else {
      setLoading(false);
    }

    return () => {
      didCancel = true;
    };
  }, [dispatch, quotesData.length]);

  const onSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetchCharacters();
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="api-page container">
      <h1 className="title title-text">Lord of the Rings</h1>
      <h2 className="subtitle-text">characters</h2>
      <CharacterNavigation onSubmitInput={onSubmitInput} changeLanguage={changeLanguage} />
      {error && <div>{error}</div>}
      {loading && !error ? <Spinner /> : !error && <Pagination />}

      <div className={`information ${language}`} data-testid="information-api-test">
        {loading && !error ? (
          <Spinner />
        ) : (
          !error && <CharacterCards characters={characterData.docs} />
        )}
      </div>
    </div>
  );
};

export default ApiPage;
