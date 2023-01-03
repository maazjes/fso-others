const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('total likes', () => {
    const blogs = testHelper.initialBlogs

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes([blogs[0]])
        expect(result).toBe(7)
    })
})
