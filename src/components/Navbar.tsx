import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { styles } from '@/styles';
import { navLinks } from '@/constants';
import { logo, menu, close } from '@/assets';

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    },
    [mobileMenuRef],
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Simon&nbsp;<span className='sm:block hidden'>| FullStack Dev</span>
          </p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={classNames({
                'text-white': location.hash === `#${link.id}`,
                'text-secondary': location.hash !== `#${link.id}`,
                'hover:text-white': true,
                'text-[18px]': true,
                'font-medium': true,
                'cursor-pointer': true,
              })}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        {/* this is for mobile navigation bar */}
        <div ref={mobileMenuRef} className='sm:hidden flex flex-1 justify-end items-center'>
              <img 
                src={toggle ? close : menu} 
                alt="menu"
                className='w-[28px] h-[28px] object-contain cursor-pointer'
                onClick={() => setToggle(!toggle)}
              />
              <div 
              className={`
                ${!toggle ? 'hidden' : 'flex'} 
                p-6 
                black-gradient 
                absolute 
                top-20 
                right-0 
                mx-4 
                my-2 
                min-w-[140px] 
                z-10 
                rounded-xl`}
              >
            <ul className='list-none flex flex-col justify-end items-start gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${location.hash === `#${link.id}` ? "text-white" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
              </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;