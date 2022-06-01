import React from "react";

const Footer = () => {
  return (
    <>
      <section 
        className="footer bg-skin-fill border-t dark:bg-skin-bgdark dark:border-opacity-10"
        style={{
          marginTop: "50px"
        }}
      >
        <div className="container  mx-auto ">
          <div className="flex flex-wrap items-center justify-between py-4 mx-auto gap-4 ">
            <div className="first">
              <p className="text-skin-white">SleekShop Partner</p>
            </div>

            <div className="last float-right text-skin-white">
              <p>© 2022 Trefox, Inc.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
