import blogService from '../services/blogs'
const blogReducer = (state = [],action) => {
    switch(action.type){
        case 'INI_BLOG': {
            return action.data.blogs
        }
        case 'ADD_BLOG': {
            return [...state,action.data.blog]
        }
        default: return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INI_BLOG',
            data: {
                blogs
            }
        })
    }
}

export const setBlogs = (blogObject) => {
    return async dispatch => {
        const blog = await blogService.createBlog(blogObject)
        dispatch({
            type: 'ADD_BLOG',
            data: {
                blog
            }
        })
    }
}

export default blogReducer