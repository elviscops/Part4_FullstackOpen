const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {

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
            "likes": 9,
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
            "title": "How to make Unit Tests worse",
            "author": "Edsger W. Dijkstra",
            "url": "https://fullstackopen.com/",
            "likes": 17,
            "id": "663d03c03ec7066632ad9fc8"
          }
      ]
  
    test('most Likes', () => {
      const result = listHelper.mostLikes(listWithMoreBlogs)
      assert.deepStrictEqual(result, {
                                        author: "Edsger W. Dijkstra",
                                        likes: 17
                                    })
    })

  })