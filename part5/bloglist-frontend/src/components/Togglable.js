import React,{ useState } from 'react'

const Togglable = ({ buttonLabel,children }) => {

  const [createBlogVisible,setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none': '' }
  const showWhenVisible = { display: createBlogVisible? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable