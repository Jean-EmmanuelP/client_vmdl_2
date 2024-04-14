import React from "react";

{/* Function to format the content when there is two spaces */}
export const formatContent = (content: string) => {
  return content.split('  ').map((text, index, array) => (
    <React.Fragment key={index}>
      {text}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
}