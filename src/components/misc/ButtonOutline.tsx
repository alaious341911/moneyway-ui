import React from 'react'

const ButtonOutline = ({ children, onclick, href }) => {
  return (
    <button
      className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-[#3538CD]
     text-[#3538CD] bg-white-500 outline-none rounded-l-full rounded-r-full hover:bg-[#3538CD]
      hover:text-white-500 transition-all hover:shadow-[#3538CD] "
      onClick={(e) => onclick(e, href)}
    >
      {' '}
      {children}
    </button>
  )
}

export default ButtonOutline
