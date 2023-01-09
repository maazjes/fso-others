const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    const blogs = testHelper.initialBlogs

    test('of a bigger list is calculated right', () => {
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(expected)
    })
})
