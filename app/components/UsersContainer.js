import React from 'react'
import { get } from '../helpers/fetcher'

import Users from './Users'

export default class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { users: null }
  }

  async componentDidMount() {
    this.setState({users: await this.getUsers()})
  }

  getUsers() {
    return get('http://localhost:8080/users')
  }

  render() {
    return this.state.users && <Users {...{users: this.state.users}}/>
  }
}
