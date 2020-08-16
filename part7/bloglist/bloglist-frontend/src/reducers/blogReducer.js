import blogService from '../services/blogs'
const blogReducer = (state = [],action) => {
    switch(action.type){
        case 'INI_BLOG': {
            return action.data.blogs
        }
        case 'ADD_BLOG': {
            return [...state,action.data.blog]
        }
        case 'LIKE_BLOG': {
            return state.map(blog => blog.id === action.data.id ? {...blog,likes: action.data.likes} : blog )
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

export const addLike = (id,likes) => {
    return async dispatch => {
        await blogService.updateBlog({
			id,
			likes
        });
        
        dispatch({
            type: 'LIKE_BLOG',
            data:{
                id,
                likes
            }
        })
    }
}

export default blogReducer