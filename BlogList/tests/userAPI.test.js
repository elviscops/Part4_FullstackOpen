const bcrypt = require('bcryptjs')
const { test, after ,beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const User = require('../models/user')
const api = supertest(app)
const listHelper = require('../utils/list_helper')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('test', 10)
        const user = new User({ username: 'testerNo0', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'testerNo1',
            name: 'Tester Number 1',
            password: 'test',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await listHelper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation of invalid username results in error', async () => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'te',
            name: 'Tester Number 2',
            password: 'test',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await listHelper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation of invalid password results in error', async () => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'testerNo2',
            name: 'Tester Number 3',
            password: 'te',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await listHelper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })



})


after(async () => {
    await mongoose.connection.close()
}) 