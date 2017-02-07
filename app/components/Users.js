import React from 'react'

import UserListRow from './UserListRow'

export default ({users}) => (
  <ul>
     {users.map((user, key) => <UserListRow {...{user, key}}/>)}
  </ul>
)