import React from 'react'
import {Link} from 'react-router-dom'


const Dashboard = () => {

    return (
        <div className='lumos'>
        <p className='top-left'>Welcome to...</p>
        <Link  to='/login' style={{color:'#bc9f06', textDecoration: 'none'}}><img src='https://www.thewordfinder.com/harry-potter-font/embed.php?text=LUMOS&bgColor=%23001061&textColor=%23b8a005&useBG=0&donut=0&useGlow=1&textGlow=1&bg=bg1.jpg' alt='lumos'/></Link>
        <p className='bottom-right'>A Harry Potter chat room</p>
        </div>
    )
}

export default Dashboard