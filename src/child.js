import React, { Component } from 'react'
import { Abc } from './Mycontext'

export default class ChildComponent extends Component {
  static contextType = Abc
  render () {
    return <Abc.Consumer>
      {context => {
        console.log(1111, context)
        return 1234
      }}
    </Abc.Consumer>
  }
}
