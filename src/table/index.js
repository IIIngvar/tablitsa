import React, { Component } from 'react';
import '../index.css'

class Table extends Component {

    constructor(props) {
      super(props);
      this.state = {

      }
    }

    render() {
      const { data, openNextPage, sortFunc, onChangeInInput, dataForInput, onSubmit } = this.props
      return (
        <div>
          <div>
            <input value={ dataForInput } onChange={onChangeInInput} />
            <button
              onClick={onSubmit}
            >Поиск...</button>
          </div>
          <table id='tablica'>
            <thead>
              <tr
              // стрелка вверх \u2191   вниз \u2193
                onClick={(e) => {
                  // console.dir(e.target)
                  sortFunc(e.target.title)
                }}
              >
                <th title={'firstName'}> Имя </th>
                <th title={'lastName'}> Фамилия </th>
                <th title={'phone'}> Телефон </th>
              </tr>
            </thead>
            <tbody>
              {
                  data.map((item) => {
                      return <tr key={Math.random()}>
                        <th>{ item.firstName }</th>
                        <th>{ item.lastName }</th>
                        <th>{ item.phone }</th>
                      </tr> 
                  })
              }
            </tbody>
          </table>
          <div onClick={( e ) => {
            openNextPage(e.target.title)
          }}>
            <button
              title={'first'}
            >
              Первая 
            </button>
            <button
              title={'previous'}
            >
              Предыдущая
            </button>
            <button 
              title={'next'}
            >
              Следующая
            </button>
            <button
              title={'last'}
            >
              Последняя
            </button>
          </div>
        </div>
      );
    }
 
  
  }
  
  export default Table;