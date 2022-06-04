import Module from "module";
import { StaticImageData } from "next/image";
import { Dispatch, ReactElement, SetStateAction } from "react";

export default interface TCard {
  id: string;
  icon: StaticImageData;
  setSelected: Dispatch<SetStateAction<string[]>>;
  // { src: string };
  // Module;
}
