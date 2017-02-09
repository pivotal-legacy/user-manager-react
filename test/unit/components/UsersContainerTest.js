import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'

import UsersContainer from '../../../app/components/UsersContainer'
import Users from '../../../app/components/Users'
import * as fetcher from '../../../app/helpers/fetcher'
import { asyncPromise } from '../helpers/asyncHelpers'

afterEach(() => expect.restoreSpies())

describe('UsersContainer', () => {
  const users = [{'username': 'bob', 'password': 'obo'}]

  describe('#getUsers', () => {
    let results, getSpy;
    beforeEach(() => {
      getSpy = expect.spyOn(fetcher, 'get').andReturn(users)

      results = UsersContainer.prototype.getUsers()
    })

    it('calls get with the correct url', () => {
      expect(getSpy).toHaveBeenCalledWith('http://localhost:8080/users')
    })

    it('returns the results from get', () => {
      expect(results).toEqual(users)
    })
  })

  describe('when component is mounted', () => {
    let usersPromise, getUsersSpy, usersContainer;
    beforeEach(async () => {
      usersPromise = asyncPromise(users)
      getUsersSpy = expect.spyOn(UsersContainer.prototype, 'getUsers').andReturn(usersPromise)

      usersContainer = mount(<UsersContainer/>)
      await usersPromise
    })

    it('calls #getUsers', () => {
      expect(getUsersSpy).toHaveBeenCalled()
    })

    it('sets users on state', () => {
      expect(usersContainer.state('users')).toEqual(users)
    })

    it('renders users', () => {
      const usersPresenter = usersContainer.find(Users)
      expect(usersPresenter.length).toBe(1)
    })
  })

  it('if users are not on state, does not render', () => {
    const usersContainer = shallow(<UsersContainer/>)

    const usersPresenter = usersContainer.find(Users)
    expect(usersPresenter.length).toBe(0)
  })
})