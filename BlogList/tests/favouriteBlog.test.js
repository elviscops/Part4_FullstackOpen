const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {

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
  
    test('favourtie blog is', () => {
        const result = listHelper.favouriteBlog(listWithMoreBlogs)
        assert.deepStrictEqual(result, {
                                            title: "How to make a Blog",
                                            author: "Me",
                                            likes: 999
                                        }
        )
    })
  })