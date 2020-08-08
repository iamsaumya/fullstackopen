import React from 'react'
import {useDispatch} from 'react-redux'
import {setFilter} from '../reducers/anecdoteFilterReducer'
const Filter = () =>{
    const dispatch = useDispatch()
    const handleChange = (e) => {
        dispatch(setFilter(e.target.value))
    }
    
    const style = {
        marginBottom: 10
    }
    
    return (
        <div style={style}>
            filter <input type='text' onChange={handleChange}/>
        </div>
    )
}

export default Filter