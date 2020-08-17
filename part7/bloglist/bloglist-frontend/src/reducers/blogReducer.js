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
    return state.map(blog => blog.id === action.data.id ? { ...blog,likes: action.data.likes } : blog )
  }
  case 'DELETE_BLOG': {
    return state.filter(blog => blog.id !== action.data.id)
  }
  case 'MAKE_COMMENT': {
    return state.map(blog => blog.id === action.data.blog.id ? action.data.blog : blog )
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
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
    })

    dispatch({
      type: 'LIKE_BLOG',
      data:{
        id,
        likes
      }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog({
      id
    })
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    })
  }
}

export const makeComment = (comment,id) => {
  return async dispatch => {
    const blog = await blogService.makeComment(
      comment,
      id
    )
    dispatch({
      type: 'MAKE_COMMENT',
      data: {
        blog
      }
    })
  }
}

export default blogReducer