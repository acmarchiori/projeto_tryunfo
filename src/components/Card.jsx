import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

function Card({
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardImage,
  cardRare,
  cardTrunfo,
}) {
  return (
    <div>
      <div className="card">
        <h2 data-testid="name-card">{cardName}</h2>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">{cardDescription}</p>
        <div className="attributes">
          <p data-testid="attr1-card">
            Attr01 .............................................
            {cardAttr1}
          </p>
          <p data-testid="attr2-card">
            Attr02 .............................................
            {cardAttr2}
          </p>
          <p data-testid="attr3-card">
            Attr03 .............................................
            {cardAttr3}
          </p>
        </div>
        <div className="footer">
          <p data-testid="rare-card">{cardRare}</p>
          {cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p>}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
