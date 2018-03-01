import * as React from 'react';

class App extends React.Component = {

  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar'
    }

    render() {
      <div>
        <p>{this.state.foo}</p>
      </div>
    }
  }

};

export default App;