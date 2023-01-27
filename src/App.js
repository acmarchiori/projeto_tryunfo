import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'Normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: false,
};

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);

    this.state = INITIAL_STATE;
  }

  onInputChange({ target }) {
    const { name, value } = target;
    console.log(name);
    this.setState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form onInputChange={ this.onInputChange } formState={ this.state } />
        <Card onInputChange={ this.onInputChange } formState={ this.state } />
      </div>
    );
  }
}

export default App;
