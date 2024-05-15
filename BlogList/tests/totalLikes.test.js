const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const listWithMoreBlogs = [
        {
            "title": "Blog Title",
            "author": "Blog author",
            "url": "tvnet.lv",
            "likes": 1,
            "id": "663921cd7e6e1445b3c7fbcc"
          },
          {
            "title": "How to make a Blog",
            "author": "Me",
            "url": "https://fullstackopen.com/",
            "likes": 999,
            "id": "663d03c03ec70ae432ab9fc8"
          }
      ]
  
    test('of empty list is zero', () => {
      const result = listHelper.totalLikes([])
      assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        assert.strictEqual(result, 1000)
    })
  })