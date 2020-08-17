import React,{ useState,useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

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
        <Button className="my-2" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className="m-2" onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable