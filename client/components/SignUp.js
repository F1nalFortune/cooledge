import React from 'react';

class SignUp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <input ref={ node => { input = node; }} />
        <button
          className="btn"
          onClick={ () => {
            dispatch(SignUp(input.value))
            input.value = '';
        }}>
        </button>
      </div>
    );
  }
}

export default SignUp;
