import React from "react";
import "./index.module.css";
import Iframe from "react-iframe";

const Map = () => {
  return (
    <div className="copyr">
      <Iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2428.4095566177666!2d13.372520476191944!3d52.507926837123975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zTGlua3N0cmHDn2XCoDIsIDjCoE9HLCAxMOKArzc4NSwgQmVybGluLCBEZXV0c2NobGFuZA!5e0!3m2!1sru!2sde!4v1705848208219!5m2!1sru!2sde"
        width="100%"
        height="400"
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div>All rights reserved &copy 2023-2024</div>
    </div>
  );
};

export default Map;
