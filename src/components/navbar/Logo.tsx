import React from "react";

interface LogoProps {
   mode: string;
}

const Logo: React.FC<LogoProps> = ({ mode }) => {
   return (
      <img
         src={`${process.env.PUBLIC_URL}/bt_logo2.png`}
         alt="Logo"
         style={{
            width: 150,
            height: "60%",
            color: mode === "dark" ? "black" : "white",
         }}
      />
   );
};

export default Logo;
