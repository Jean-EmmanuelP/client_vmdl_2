import { RoofSVGProps } from "@/app/utils/interface";
import * as React from "react";

const RoofSVG: React.FC<RoofSVGProps> = (props) => (
  <svg
    fill={props.fill || "#ffffff"}
    width={props.width || "auto"}
    height={props.height || "auto"}
    viewBox={props.viewBox || "0 0 50 50"}
    baseProfile={props.baseProfile || "tiny"}
    xmlns={props.xmlns || "http://www.w3.org/2000/svg"}
    overflow={props.overflow || "inherit"}
    {...props}
  >
    <path d="M8.149 16.062h6.06l-.053 3.575-6.007 5.406v-8.981zM24.907 14.083l-23.907 21.086 2.52 2.831 21.485-18.954 21.481 18.954 2.514-2.831-23.903-21.086-.097-.083-.093.083z" />
  </svg>
);

export default RoofSVG;
