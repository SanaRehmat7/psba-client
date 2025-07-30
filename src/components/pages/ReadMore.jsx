import { useState } from "react";

const ReadMoreText = ({ text, wordLimit = 110 }) => {
  const [expanded, setExpanded] = useState(false);

  const words = text.trim().split(/\s+/);
  const isLong = words.length > wordLimit;
  const visibleText =
    expanded || !isLong ? text : words.slice(0, wordLimit).join(" ") + "...";

  return (
    <blockquote className="text-green-800 text-sm leading-relaxed italic border-l-4 border-green-600 pl-4 mb-4">
      <p>{visibleText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-yellow-600 underline mt-2 focus:outline-none"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </blockquote>
  );
};

export default ReadMoreText;