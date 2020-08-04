import React,{ useState,useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props,ref) => {

  const [createBlogVisible,setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none': '' }
  const showWhenVisible = { display: createBlogVisible? '' : 'none' }

  const toggleVisibility = () => {
    setCreateBlogVisible(!createBlogVisible)
  }
  useImperativeHandle(ref,() => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable