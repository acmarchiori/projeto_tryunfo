import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import CardFind from './components/CardFind';
import './styles/App.css';
import logo from './images/logo_tryunfo.png';

const INITIAL_STATE = { cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'normal',
  nameFilter: '',
  rareFilter: 'todas',
  trunfoFilter: '',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  savedCards: [],
  showSavedCards: true };

class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const newValue = type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: newValue,
      },
      () => {
        this.btnDisabled();
        this.updateShowSavedCards(); // Chamamos essa função toda vez que o filtro é alterado
      },
    );

    if (name === 'trunfoFilter') {
      this.setState({ nameFilter: '', rareFilter: 'todas' });
    }
  };

  handleClick = () => {
    const { cardName, cardDescription, cardImage, cardRare, cardAttr1, cardAttr2,
      cardAttr3, savedCards, cardTrunfo } = this.state;
    this.setState({ savedCards: [...savedCards,
      { cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardTrunfo,
      },
    ],
    cardName: '',
    cardDescription: '',
    cardAttr1: 0,
    cardAttr2: 0,
    cardAttr3: 0,
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    });
    this.checkedDisable();
  };

  removeItem = ({ target }) => {
    const getName = target.name;
    const getId = target.id;
    const { savedCards } = this.state;
    if (savedCards[getId].cardTrunfo) {
      this.setState({ cardTrunfo: false, hasTrunfo: false });
    }
    const verifyDeleted = savedCards.filter((cards) => cards.cardName !== getName);
    this.setState({ savedCards: verifyDeleted });
  };

  btnDisabled = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;
    const attr1 = parseInt(cardAttr1, 10);
    const attr2 = parseInt(cardAttr2, 10);
    const attr3 = parseInt(cardAttr3, 10);
    const total = attr1 + attr2 + attr3;
    const maxAttr = 90;
    const max = 210;
    if (cardName.length > 0 && cardImage.length > 0 && cardDescription.length > 0
      && cardRare.length > 0 && attr1 <= maxAttr && attr1 >= 0 && attr2 <= maxAttr
      && attr2 >= 0 && attr3 <= maxAttr && attr3 >= 0 && total <= max) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  checkedDisable = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }
  };

  filterCards = () => {
    const { nameFilter, rareFilter, trunfoFilter, savedCards } = this.state;

    const filteredCards = savedCards.filter((card) => {
      const matchesName = card.cardName.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesRarity = rareFilter
      === 'todas' || card.cardRare.toLowerCase() === rareFilter.toLowerCase();
      const isTrunfo = card.cardTrunfo === true;
      return (!nameFilter || matchesName)
      && (!rareFilter || matchesRarity) && (!trunfoFilter || isTrunfo);
    });
    return filteredCards;
  };

  updateShowSavedCards = () => {
    const { nameFilter, trunfoFilter } = this.state;
    const showSavedCards = nameFilter === '' && !trunfoFilter;
    this.setState({ showSavedCards });
  };

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      nameFilter,
      rareFilter,
      trunfoFilter,
      isSaveButtonDisabled,
      hasTrunfo,
      savedCards,
      showSavedCards } = this.state;

    return (
      <div>
        <header>
          <img src={ logo } alt="Tryunfo Logo" />
        </header>
        <div className="App">
          <div>
            <h2>ADICIONE NOVA CARTA</h2>
            <Form
              onInputChange={ this.handleChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.handleClick }
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
            />
          </div>
          <div>
            <h2>PRÉ-VISUALIZAÇÃO</h2>
            <Card
              cardName={ cardName }
              cardImage={ cardImage }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </div>
        </div>
        <div>
          <h1>TODAS AS CARTAS</h1>
          <CardFind
            onInputChange={ this.handleChange }
            nameFilter={ nameFilter }
            rareFilter={ rareFilter }
            trunfoFilter={ trunfoFilter }
            filteredCards={ this.filterCards }
          />
        </div>
        <div className="cards">
          {showSavedCards && savedCards.length > 0 && savedCards.map((card, index) => (
            <div className="cardWrapper" key={ card.cardName }>
              <Card
                cardName={ card.cardName }
                cardImage={ card.cardImage }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <button
                id={ index }
                data-testid="delete-button"
                onClick={ this.removeItem }
                name={ card.cardName }
                type="button"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
        <div className="filteredCards">
          {nameFilter !== ''
    && this.filterCards().length > 0
    && this.filterCards().map((card, index) => (
      <div key={ index }>
        <Card
          cardName={ card.cardName }
          cardImage={ card.cardImage }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
        />
      </div>
    ))}
          {nameFilter !== ''
    && this.filterCards().length === 0 && (<p>Nenhuma carta encontrada.</p>)}
        </div>
      </div>
    );
  }
}
export default App;
