import React from "react";
import { Howl } from "howler";
import { NavLink } from "react-router-dom";

export default function ButtonMenu({ route, title, Icon }) {
  // Sound for activating button
  const activationSound = new Howl({
    src: ["/songs/Effect-Card-Start.mp3"],
    volume: 0.5,
  });

  return (
    <NavLink to={route} className="w-2/3">
      <button
        className="flex text-start w-full  p-3 text-2xl font-bold bg-custom-green rounded-2xl text-white transform transition duration-250 hover:bg-custom-green-dark hover:scale-110 hover:-translate-y-4"
        onMouseEnter={() =>
          activationSound.play()
        }
      >
        {Icon && <Icon className="h-6 w-6 mr-3" />}
        {title}
      </button>
    </NavLink>
  );
}
