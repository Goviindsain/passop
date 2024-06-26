import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'> &lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/ &gt;</span>


        </div>
        {/*   <ul>

          <li className='flex gap-4'>
            <a className='hover:font-bold' href="">home</a>
            <a className='hover:font-bold' href="">about</a>
            <a className='hover:font-bold' href="">contact</a>
          </li>
        </ul> */}
        
        <button className='bg-green-700 my-5 rounded-full flex justify-between items-center text-white ring-white ring-1'>
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
