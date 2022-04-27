import React, { useContext } from 'react';
import { AppContext } from '../../../../store/context';
import { Types } from '../../../../store/reducers';
import { makeArray } from '../../../../utils/functions';

const Pagination = () => {
  const { state, dispatch } = useContext(AppContext);
  const { characterData } = state.apiPage;

  return (
    <div className="pagination-wrapper">
      <div>
        <span>Page:</span> {characterData.page} / {characterData.pages}
      </div>
      <div className="pagination">
        <div className="pagination-nav">
          <a
            className={characterData.page <= 1 ? 'disable-btn' : ''}
            onClick={() => {
              if (characterData.page > 1) {
                dispatch({
                  type: Types.SetCharactersData,
                  payload: { ...characterData, page: characterData.page - 1 },
                });
              }
            }}
          >
            Prev
          </a>
          <a
            className={characterData.page >= characterData.pages ? 'disable-btn' : ''}
            onClick={() => {
              if (characterData.page < characterData.pages) {
                dispatch({
                  type: Types.SetCharactersData,
                  payload: { ...characterData, page: characterData.page + 1 },
                });
              }
            }}
          >
            Next
          </a>
        </div>
        <div className="pagination-btns">
          {makeArray(characterData.pages).map((page) => {
            return (
              <a
                key={page}
                onClick={() => {
                  dispatch({
                    type: Types.SetCharactersData,
                    payload: { ...characterData, page: page },
                  });
                }}
                className={page === characterData.page ? 'pagination__active' : ''}
              >
                {page}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
