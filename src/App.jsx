import { useState } from "react";
import "./App.css"
function App() {
  const [emailContent, setEmailContent] = useState(' ');
  const [tone, setTone] = useState(' ');
  const [generatedReply, setGeneratedReply] = useState(' ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(' ');
  const handleGenerateReply = async () => {
    if (!emailContent.trim()) {
      setError("Please enter the email content.");
      return;
    }
    setLoading(true);
    setError(" ");
    setGeneratedReply(" ");
    try {
      const response = await fetch("https://replypilot-backend-kjxi.onrender.com/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: tone,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate reply");
      }
      const data = await response.text();
      setGeneratedReply(data);

    }
    catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Email Reply Generator</h1>
          <p>Generate professional email replies using AI</p>
        </header>
        <div className="card">
          <label htmlFor="emailContent">Email Content</label>
          <textarea
            id="emailContent"
            placeholder="Paste the email you received here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows="10"
          ></textarea>
          <label htmlFor="tone">Reply Tone</label>
          <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="">Select a tone</option>
            <option value="Professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="Apologetic">Apologetic</option>
            <option value="appreciative">Appreciative</option>
          </select>
          <button onClick={handleGenerateReply} disabled={loading}>
            {loading?"Generating...":"Generate Reply"}
          </button>
          {error&&(<p className="error">{error}</p>)}
          {generatedReply && (
            <div className="result">
              <div className="result-header">
                <h2>Generated Reply</h2>
                <button 
                  className="copy-button" 
                  onClick={()=>
                    navigator.clipboard.writeText(generatedReply)
                  }>Copy   
                </button>
              </div>
              <div className="reply">{generatedReply}</div>
            </div>
          
          )}

        </div>
      </div>

    </div>
  );
}

export default App
