import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import EditorModule from "react-simple-code-editor";
import axios from "axios";
import Prism from "prismjs";
import Markdown from "react-markdown";
import "prismjs/components/prism-javascript";
import "./App.css";

const Editor = EditorModule.default;

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      );

      console.log("Response:", response.data);

      setReview(response.data.review);
    } catch (error) {
      console.error("Frontend Error:", error);

      setReview(
        error.response?.data?.message ||
          error.message ||
          "Unknown error"
      );
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                Prism.highlight(
                  code,
                  Prism.languages.javascript,
                  "javascript"
                )
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code","Fira Mono", monospace',
                fontSize: 18,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;