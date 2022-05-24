import React from 'react';
import Image from 'next/image';
import header from "./Header.module.css";

const Logo = () => {
  return (
    <div>
      <Image
        width="82"
        height="61"
        src="/static/img/logo.png"
      />
    </div>
  )
}

export default Logo
