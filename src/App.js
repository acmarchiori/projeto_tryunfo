import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './styles/App.css';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  savedCards: [],
};

class App extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.btnDisabled = this.btnDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.checkedDisable = this.checkedDisable.bind(this);
  }

  // componentDidMount() {
  //   const pegarLS = JSON.parse(localStorage.getItem('cardSalvo'));

  //   if (pegarLS !== null) {
  //     this.setState({
  //       savedCards: pegarLS,
  //     });
  //   }
  // }

  handleChange({ target }) {
    const { name, type } = target;
    const newValue = (type === 'checkbox' ? target.checked : target.value);
    this.setState({
      [name]: newValue,
    }, this.btnDisabled);
  }

  handleClick() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      savedCards,
      cardTrunfo,
    } = this.state;
    this.setState({
      savedCards: [
        ...savedCards,
        {
          cardName,
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
  }

  // saveLocalStorage = () => {
  //   const { savedCards } = this.state;
  //   localStorage.setItem('cardSalvo', JSON.stringify(savedCards));
  // };

  removeItem({ target }) {
    const getName = target.name;
    const getId = target.id;
    const { savedCards } = this.state;

    if (savedCards[getId].cardTrunfo) {
      this.setState({
        cardTrunfo: false,
        hasTrunfo: false,
      });
    }
    const verifyDeleted = savedCards.filter((cards) => cards.cardName !== getName);
    this.setState({
      savedCards: verifyDeleted,
    });
  }

  btnDisabled() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

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
  }

  checkedDisable() {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      savedCards,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <div className="App">
          <div className="Form">
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
          <div className="Card">
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
          <h1>Todas as cartas</h1>
        </div>
        <div>
          <label htmlFor="name-filter">
            Filtros de busca
            <input
              type="text"
              name="name-filter"
              placeholder="Nome da carta"
              data-testid="name-filter"
            />
          </label>
        </div>
        <br />
        <div className="savedCards">
          {savedCards.length > 0 && savedCards.map((card, index) => (
            <div key={ card.cardName }>
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
      </div>
    );
  }
}

export default App;
