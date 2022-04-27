import React, { useContext } from 'react';
import { SortByType, SortType } from '../../../../data/apiTypes';
import { AppContext } from '../../../../store/context';
import { Types } from '../../../../store/reducers';
import { setObjectToLocal } from '../../../../utils/functions';
import MyInput from '../../../UI/input/MyInput';
import MySelect from '../../../UI/select/MySelect';

interface Props {
  onSubmitInput: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  changeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CharacterNavigation: React.FC<Props> = (props) => {
  const { onSubmitInput, changeLanguage } = props;
  const { state, dispatch } = useContext(AppContext);
  const { characterData, searchValue } = state.apiPage;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: Types.ChangeSearch, payload: value });
    const apiSearch = { apiSearch: value };
    // set to local storage
    setObjectToLocal(apiSearch);
  };

  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'limit') {
      dispatch({
        type: Types.SetCharactersData,
        payload: { ...characterData, limit: +value, page: 1 },
      });
    } else {
      dispatch({
        type: Types.SetCharactersData,
        payload: { ...characterData, [name]: value },
      });
    }
  };

  return (
    <div className="character-navigation">
      <form onSubmit={onSubmitInput}>
        <MyInput
          label="Search for character"
          type="search"
          placeholder="search..."
          value={searchValue}
          onChange={handleChange}
          data-testid="character-input-test"
        />
      </form>

      <MySelect
        label="Sort by"
        name="sortBy"
        onChange={changeSelect}
        value={characterData.sortBy}
        values={[SortByType.name, SortByType.race, SortByType.gender]}
        options={['Character name', 'Race', 'Gender']}
      />

      <MySelect
        label="From To"
        name="sort"
        onChange={changeSelect}
        value={characterData.sort}
        values={[SortType.asc, SortType.desc]}
        options={['From «A» to «Z»', 'From «Z» to «A»']}
      />

      <MySelect
        label="Choose limit"
        name="limit"
        value={characterData.limit.toString()}
        onChange={changeSelect}
        values={['20', '30', '40', '50', '60', '70']}
      />

      <MySelect
        label="Choose language"
        onChange={changeLanguage}
        values={['human', 'elves', 'hobbits', 'dwarfs', 'mordor']}
        data-testid="character-select-test"
      />
    </div>
  );
};

export default CharacterNavigation;
