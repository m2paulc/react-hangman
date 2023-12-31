import { Component } from "react";
import PropTypes from 'prop-types';
import "./Hangman.css";
import img0 from "../assets/0.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: "" };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.setState({ answer: randomWord() });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={ index }
        value={ ltr }
        onClick={ this.handleGuess }
        disabled={ this.state.guessed.has(ltr) }
      >
        { ltr }
      </button>

    ));
  }

  reset() {
    this.setState({
      nWrong: 0, guessed: new Set(), answer: randomWord()
    });
  }

  /** render: render game */
  render() {
    let gameOver = this.state.nWrong >= this.props.maxWrong;
    let gameWin = this.guessedWord().join('') === this.state.answer;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={ this.props.images[this.state.nWrong] } alt={ `${this.state.nWrong} of ${this.props.maxWrong} wrong guesses` } />
        <p className='Hangman-word'>{ gameOver ? this.state.answer : this.guessedWord() }</p>
        <p>Number of Wrong Guesses: { this.state.nWrong }</p>
        { gameOver ? <p>You Lose!</p> : gameWin ? <p>You Win!</p> :
          <p className='Hangman-btns'>{ this.generateButtons() }</p>
        }
        <button id='reset' onClick={ this.reset }>Restart</button>
      </div>
    );
  }
}

Hangman.propTypes = {
  maxWrong: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string)
};

export default Hangman;
