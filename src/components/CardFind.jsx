import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/CardFind.css';

class CardFind extends Component {
  render() {
    const { nameFilter, rareFilter, trunfoFilter, onInputChange } = this.props;

    return (
      <div>
        <div className="Search">
          <label htmlFor="nameFilter">
            Filtros de busca
            <input
              id="nameFilter"
              type="text"
              name="nameFilter"
              placeholder="Nome da carta"
              data-testid="name-filter"
              value={ nameFilter }
              onChange={ onInputChange }
              disabled={ trunfoFilter }
            />
          </label>
          <select
            id="rareFilter"
            name="rareFilter"
            data-testid="rare-filter"
            value={ rareFilter }
            onChange={ onInputChange }
            disabled={ trunfoFilter }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
          <label htmlFor="cardTrunfo">
            Super Trunfo
            <input
              id="trunfoFilter"
              type="checkbox"
              name="trunfoFilter"
              data-testid="trunfo-filter"
              checked={ trunfoFilter }
              onChange={ onInputChange }
            />
          </label>
        </div>
      </div>
    );
  }
}

CardFind.propTypes = {
  nameFilter: PropTypes.string,
  rareFilter: PropTypes.string,
  trunfoFilter: PropTypes.bool,
  onInputChange: PropTypes.func,
}.isRequired;

export default CardFind;
