
import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css"; // this is library
import "highlight.js/styles/github-dark.css"; // this is library

// react-markdown
// rehype-highlight

function Chat() {
    // State Variable
    const {newChat, prevChats, reply} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    // Hook
    useEffect(() => {
        if(reply === null) {
            setLatestReply(null); // prevChat load
            return;
        };

        // latestReply Separate => typing effect create
        if(!prevChats?.length) return;

        const content = reply.split(" "); // individual words

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));
            idx++;

            if(idx >= content.length) clearInterval(interval);
            
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply]);

    return (
        <>
            {newChat && <h1>Start a New Chat!</h1>}
            {/* Dynamic Data */}
            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat, idx) => 
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {
                                chat.role === "user" ? 
                                <p className="userMessage">{chat.content}</p> : 
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"}>
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"}>
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                    </div>
                                )

                            }
                        </>
                    )
                }

                {/* {
                    prevChats.length > 0 && latestReply !== null &&
                    <div className="gptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                }

                {
                    prevChats.length > 0 && latestReply === null &&
                    <div className="gptDiv" key={"non-typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                    </div>
                } */}

                {/* Static Data */}
                {/* <div className="userDiv">
                    <p className="userMessage"> User Message</p>
                </div>

                <div className="gptDiv">
                    <p className="gptMessage">GPT Generated Message</p>
                </div> */}
            </div>
        </>
    );
};

export default Chat;