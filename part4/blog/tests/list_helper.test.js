const { dummy,totalLikes, favoriteBlog, mostLikes, mostBlogs } = require("../utils/list_helper")

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]
test("dummy returns 1",() => {
	const blogs = []

	const result = dummy(blogs)
	expect(result).toBe(1)
})

describe("total likes",() => {
	test("of empty list to zero",() => {
		const blogs = []
		expect(totalLikes(blogs)).toBe(0)
	})

	test("when list has only one blog equals the likes of that", () => {
		expect(totalLikes(blogs.slice(0,1))).toBe(7)
	})

	test("of a bigger list is calculated right", () => {
		expect(totalLikes(blogs)).toBe(36)
	})
})

describe("most liked",() => {
	test("of empty list of zero",() => {
		const blogs = []
		expect(favoriteBlog(blogs)).toEqual({})
	})

	test("when list has only one blogs equals the likes of that",() => {
		expect(favoriteBlog(blogs.slice(0,1))).toEqual(	{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		})
	})
})


describe("most Likes",() => {
	test("of empty list of zero",() => {
		const blogs = []
		expect(mostLikes(blogs)).toEqual({})
	})

	test("when list has only one blogs",() => {
		expect(mostLikes(blogs.slice(0,1))).toEqual({
			author: "Michael Chan",
			likes: 7
		})
	})
	test("of list a big list of blogs" , () => {
		expect(mostLikes(blogs)).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17
		})
	})
})

describe("most Blogs",() => {
	test("of empty list of zero",() => {
		const blogs = []
		expect(mostBlogs(blogs)).toEqual({})
	})

	test("when list has only one blogs",() => {
		expect(mostBlogs(blogs.slice(0,1))).toEqual({
			author: "Michael Chan",
			blogs: 1
		})
	})
	test("of list a big list of blogs" , () => {
		expect(mostBlogs(blogs)).toEqual({
			author: "Robert C. Martin",
			blogs: 3
		})
	})
})