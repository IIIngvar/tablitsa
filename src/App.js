import React, { Component } from 'react';
import './App.css';

import Table from './table';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      data: null,
      start: 0,
      offset: 10,
      sortedColl: null,
      input: '',
    };
    this.openNextPage = this.openNextPage.bind(this);
    this.sortFunc = this.sortFunc.bind(this);
    this.onChangeInInput = this.onChangeInInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openNextPage(typeOfButton) {
    if (typeOfButton === 'first') {
      this.setState( state => ({
        start: 0
      }));
    } else if (typeOfButton === 'previous') {
      this.setState( state => ({
        start: state.start - state.offset
      }));
    } else if (typeOfButton === 'next') {
      this.setState( state => ({
        start: state.start + state.offset
      }));
    } else if (typeOfButton === 'last') {
      this.setState( state => ({
        start: state.data.length - state.offset
      }));
    }
  }

  sortFunc(nameOfColl) {
    const {sortedColl} = this.state
    let reverse
    if (nameOfColl !== sortedColl) {
      this.setState({
        sortedColl: nameOfColl
      })
      reverse = -1
    } else if (nameOfColl === sortedColl) {
      this.setState({
        sortedColl: null
      })
      reverse = 1
    }

    const arrayForSorting = this.state.data
    arrayForSorting.sort(compairField);
    function compairField(val1, val2) {
      if (val1[nameOfColl] > val2[nameOfColl]) {
        return -1 * reverse
      } else {
        return 1 * reverse
      }
    }
 
    this.setState(( state ) => {
      return {
        data: arrayForSorting
      }
    })
  }

  onChangeInInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  onSubmit() {
    // this.state.input
    const filteredArr = this.state.data.filter((item) => {
      let isNeed = false;
      for (let key in item) {
        try {
          if (item[key].toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1) {
            isNeed = true;
          }
        } catch(e) {
          console.log(e)
        }
      }
      if (isNeed) {
        return item
      }
    })
    this.setState({
      data: filteredArr
    })
  }

  render() {
    const { data, start, offset } = this.state

    return (
      this.state.data 
      ? <div className="App">
          <Table 
            data={data.slice(start, start + offset)} 
            openNextPage={this.openNextPage}
            sortFunc={this.sortFunc}
            onChangeInInput={this.onChangeInInput}
            dataForInput={this.state.input}
            onSubmit={this.onSubmit}
          />
        </div>
      : <div>
          Загрузка...
        </div>
    );
  }

  componentDidMount() {
    fetch('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=1&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D/article/fetch/user.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        })
      })
      .catch(error => console.error(error))
  }


}

export default App;