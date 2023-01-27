import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <>
        <h2>Adicione Nova Carta</h2>
        <label htmlFor="name">
          Nome
          <input
            data-testid="name-input"
            type="text"
            name="name"
            required
          // value={ name }
          // onChange={ onChange }
          />
        </label>
        <br />
        <label htmlFor="description-input">
          Descrição
          <textarea
            name="description-input"
            data-testid="description-input"
            required
            // value={resume}
            // onChange={onChange}
          />
        </label>
        <br />
        <label htmlFor="attr1-input">
          Attr01
          <input type="number" name="attr1-input" data-testid="attr1-input" />
        </label>
        <br />
        <label htmlFor="attr2-input">
          Attr02
          <input type="number" name="attr2-input" data-testid="attr2-input" />
        </label>
        <br />
        <label htmlFor="attr1-input">
          Attr03
          <input type="number" name="attr3-input" data-testid="attr3-input" />
        </label>
        <br />
        <label htmlFor="image-input">
          Imagem
          <input type="text" name="image-input" data-testid="image-input" />
        </label>
        <br />
        <label htmlFor="rare-input">
          Raridade
          <select name="rare-input" data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <br />
        <label htmlFor="trunfo-input">
          Super Trybe Trunfo
          <input type="checkbox" name="trunfo-input" data-testid="trunfo-input" />
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </>
    );
  }
}

export default Form;
