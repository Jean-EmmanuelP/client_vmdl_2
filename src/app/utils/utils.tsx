import React from "react";

export const formatContent = (content: string) => {
  return content.split('  ').map((text, index, array) => (
    <React.Fragment key={index}>
      {text}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
}