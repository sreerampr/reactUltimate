import React from 'react';
import { connect } from 'react-redux';
import { addWord } from '../../../../actions/words/wordsActions';
import Styles from './AddWord.less';
import _ from 'lodash';
import base64 from 'base-64';

const AddWord = ({ theWord, add, words }) => {
  let input;
  theWord = base64.decode(theWord);
  const populate = () => {
    // console.log(words.pop());
  }

  return (
    <div className='row'>
    <div className={Styles.addWord + ' col-xs-12'}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (input.value === '' || _.uniqBy(input.value).length !== theWord.length) return false;
        add(input.value);
        input.value = '';
      }}>
        <div>
          <div className='row'>
          <div className='col-xs-3 col-sm-2 col-md-3'><label htmlFor="usr" className={Styles.guessString}> Guess: </label></div>
          <div className='col-xs-6 col-sm-8 col-md-6'>
            <input type="text"
              id="usr"
              ref={node => input = node}
              maxLength={theWord.length}
              onKeyDown={populate}
              autoFocus
              pattern="\d*"
              className={'form-control ' + Styles.input}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none" />
          </div>
          <div className='col-xs-3 col-sm-2 col-md-3'>
            <button type="submit" className='btn btn-primary' onClick={() => {
              if (input.value === '' || _.uniqBy(input.value).length !== theWord.length) return false;
              add(input.value);
              input.value = '';
            }}>Go</button>
          </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theWord: state.theWord,
    words: state.words
  };
};

const mapDispatchToProps = (dispatch) => ({
  add: word => {
    dispatch(addWord(word.toLowerCase()));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWord);
