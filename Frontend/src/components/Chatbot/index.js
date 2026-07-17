import { Component } from "react";
import "./index.css";

class Chatbot extends Component {
  state = {
    messages: [],
    input: "",
    isOpen: false,
    isLoading: false,
  };
  onChangeInput = (e) => {
    this.setState({ input: e.target.value });
  };
  sendMessage = async () => {
    try {
      const { input, messages } = this.state;
      if (input.trim() === "") {
        return;
      }
      const UseMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
      };
      this.setState({
        messages: [...messages, UseMessage],
        input: "",
        isLoading: true,
      });
      const url = "http://localhost:5000/api/chat";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      } else {
        const botMessage = {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
        };
        this.setState((prevState) => ({
          messages: [...prevState.messages, botMessage],
          isLoading: false,
        }));
      }
    } catch (err) {
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          {
            id: Date.now() + 1,
            text: "Sorry, I am unable to respond to your message at the moment",
            sender: "bot",
          },
        ],
        isLoading: false,
      }));
    }
  };
  togglechat = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    const { isOpen, messages, input, isLoading } = this.state;
    return (
      <>
        <div className="Chat-Container">
          {!isOpen && (
            <button className="chat-btn" onClick={this.togglechat}>
              💬
            </button>
          )}
          {isOpen && (
            <div>
              <div className="chat-window">
                <div className="chat-header">
                  <h1> AI Shopping Assistant</h1>
                  <button className="close-btn" onClick={this.togglechat}>
                    {" "}
                    ✖
                  </button>
                </div>
                <div className="chat-body">
                  <p className="bot-message">
                    Hello! 👋 I'm your AI Shopping Assistant. I can help you:
                    • Find products 
                    • Compare products
                    • Explain features 
                    • Answer shopping questions • Help with your orders
                  </p>
                  {messages.map((each) => (
                    <div
                      key={each.id}
                      className={
                        each.sender === "user" ? "user-message" : "bot-message"
                      }
                    >
                      {each.text}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="bot-message">AI is typing...</div>
                  )}
                </div>
                <div className="chat-footer">
                  <input
                    type="text"
                    placeholder="Type your message here"
                    value={input}
                    onChange={this.onChangeInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        this.sendMessage();
                      }
                    }}
                  />
                  <button
                    className="send-btn"
                    onClick={this.sendMessage}
                    disabled={isLoading}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Chatbot;
