import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
   markdownPath: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ markdownPath }) => {
   const [markdownContent, setMarkdownContent] = useState<string>("");

   useEffect(() => {
      fetch(markdownPath)
         .then((response) => response.text())
         .then((text) => setMarkdownContent(text))
         .catch((error) =>
            console.error("Error loading markdown file:", error),
         );
   }, [markdownPath]);

   return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

export default MarkdownContent;
