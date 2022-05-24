import React, { useState } from "react";
import Logo from "./logo";
import Toggle from "./toggle";
import Link from "next/link";
import { useRouter } from 'next/router';
import header from './Header.module.css';

const Header = () => {

  // let clicked = "clicked";
  // const [classes, setClasses] = useState<string>("clicked")
  const router = useRouter();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className={`bg-white ${header.border_shadow}`}>
        <div className="mx-auto md:layout-px-1 lg:layout-px-2 xl:layout-px-3">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <Logo />
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/">
                  <a className={`py-4 px-2 hover:text-skin-base transition duration-300 ${router.pathname == "/" ? "text-skin-base" : "text-skin-dark"}`}>SHOP</a>
                </Link>
                <Link href="/request">
                  <a className={`py-4 px-2 hover:text-skin-base transition duration-300 ${router.pathname == "/request" ? "text-skin-base" : "text-skin-dark"}`}>REQUEST</a>
                </Link>
                <Link href="/about-us">
                  <a className={`py-4 px-2 hover:text-skin-base transition duration-300 ${router.pathname == "/about-us" ? "text-skin-base" : "text-skin-dark"}`}>ABOUT US</a>
                </Link>
                
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 ">
              <a href="" className="py-2 px-2 font-medium text-skin-white rounded bg-skin-fill hover:bg-skin-fill transition duration-300">Log In</a>
              <a href="" className="py-2 px-2 font-medium text-skin-white rounded bg-skin-fill hover:bg-skin-fill transition duration-300">Sign Up</a>
              <Toggle />
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
              <svg
                className="w-6 h-6 text-skin-dark hover:text-skin-base"
                x-show="!showMenu"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href={`/static/svg/feather-sprite.svg#menu`}/>
              </svg>
            </button>
            </div>
          </div>
        </div>
        <div className={`${mobileMenuIsOpen ? '' : 'hidden'} md:hidden mobile-menu`}>
          <ul className="">
            <li className="active">
              <Link href="/">
                <a className="block text-sm px-2 py-4 text-skin-dark bg-skin-fill font-semibold">SHOP</a>
              </Link>
            </li>
            <li>
              <Link href="/request">
                <a className="block text-sm px-2 py-4 hover:bg-skin-fill hover:text-skin-white transition duration-300">REQUEST</a>
              </Link>
            </li>
            <li>
              <Link href="/about-us">
                <a className="block text-sm px-2 py-4 hover:bg-skin-fill hover:text-skin-white transition duration-300">ABOUT US</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;