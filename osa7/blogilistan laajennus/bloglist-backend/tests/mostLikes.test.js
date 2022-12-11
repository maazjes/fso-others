const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('most blogs', () => {
    const blogs = testHelper.initialBlogs

    test('of a bigger list is calculated right', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(expected)
    })
})
