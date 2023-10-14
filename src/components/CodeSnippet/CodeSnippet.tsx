import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/themes/prism-okaidia.min.css";
import "./CodeSnippet.css";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet = ({
  code,
  language = "javascript",
}: CodeSnippetProps): React.ReactElement => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className="question__code">
      <code className={`language-${language ? language : "javascript"}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeSnippet;
