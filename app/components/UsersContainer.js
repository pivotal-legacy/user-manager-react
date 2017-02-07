import React from 'react'
import { get } from '../helpers/fetcher'

import Users from './Users'

export default class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { users: null }
  }

  componentDidMount() {
    this.getUsers().then(users => this.setState({users}))
  }

  getUsers() {
    return get('http://localhost:8080/users')
  }

  render() {
    return this.state.users && <Users {...{users: this.state.users}}/>
  }
}
