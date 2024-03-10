import React, { useState, useEffect, useRef } from "react";

const TextCycle = ({ texts }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chars, setChars] = useState([]);
  const uniqueKeyRef = useRef(0);

  useEffect(() => {
    const changeText = () => {
      uniqueKeyRef.current += 1;
      setChars(
        texts[currentIndex].split("").map((c:string) => (c === " " ? "\u00A0" : c))
      );
    };

    const timeoutId = setTimeout(changeText, texts[currentIndex].length * 1);

    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % texts.length);
    }, (texts[currentIndex].length * 2 + 20) * 100);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [currentIndex, texts]);

  return (
    <p className="text" key={uniqueKeyRef.current}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="letter uppercase"
          style={{
            animationDelay: `${index * 100}ms`,
            animationName: "dominoEffectIn",
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
};

export default TextCycle;
