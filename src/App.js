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
  cardRare: '',
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
    const { name, value } = target;
    this.setState({
      [name]: value,
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
        },
      ],
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
    }, this.saveLocalStorage);
  }

  saveLocalStorage = () => {
    const { savedCards } = this.state;
    localStorage.setItem('cardSalvo', JSON.stringify(savedCards));
  };

  removeItem = ({ target }) => {
    const getName = target.id;
    const { savedCards } = this.state;

    const verifyDeleted = savedCards.filter((cards) => cards.nome !== getName);
    this.setState({
      savedCards: verifyDeleted,
    }, this.saveLocalStorage);
  };

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
    } = this.state;

    return (
      <div className="App">
        <div className="inputs">
          <h1>Tryunfo</h1>
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
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>
      </div>
    );
  }
}

export default App;
