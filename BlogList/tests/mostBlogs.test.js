const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {

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
            "author": "Robert C. Martin",
            "url": "https://fullstackopen.com/",
            "likes": 999,
            "id": "663d03c03ec70ae432ab9fc8"
          },
          {
            "title": "How to make Unit Tests",
            "author": "Robert C. Martin",
            "url": "https://fullstackopen.com/",
            "likes": 6,
            "id": "663d03c03ec7066632ab9fc8"
          },
          {
            "title": "How to make Unit Tests better",
            "author": "Robert C. Martin",
            "url": "https://fullstackopen.com/",
            "likes": 3,
            "id": "663d03c03ec7066632ad9fc8"
          }
      ]
  
    test('most blogs', () => {
      const result = listHelper.mostBlogs(listWithMoreBlogs)
      assert.deepStrictEqual(result, {
                                        author: "Robert C. Martin",
                                        blogs: 3
                                    })
    })

  })