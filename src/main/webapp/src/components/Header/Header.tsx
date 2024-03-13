import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import WindowPopUp from "../WindowPopUp/WindowPopUp";
import { Message } from "../Message/Message";
import "./Header.css"

interface MessagePrompt {
    type: string,
    content: string
}

const Header = () => {

    const [mode, setMode] = useState("")
    const isUser = false
    const [message, setMessage] = useState({type:"", content:""})


    const handleButtton_Login = () => {
        setMode("Login")
    }
    const handleButtton_Register = () => {
        setMode("Register")
    }

    const showMessage = (msg: MessagePrompt) => {
        setMessage(msg)
        setTimeout(() => {
            setMessage({type:"", content:""})
        }, 5000)
    }

    return (
        <>
        <header className="header">
            <div className="logo"></div>
            <nav>
                <ul>
                    <li><a href="./Home">Home</a></li>
                    <li><a href="./About">About</a></li>
                    <li><a href="./Download">Download</a></li>
                    <li><a href="./Presets">Presets</a></li>
                    <li><a href="./ProcessFile">Process File</a></li>
                </ul>
            </nav>
            <div className="options">
                {isUser && 
                    <Avatar/>
                }
                {!isUser && 
                    <>
                        <button className="button-A button-login" onClick={handleButtton_Login}>Login</button>
                        <button className="button-B button-register" onClick={handleButtton_Register}>Register</button>
                    </>
                }
            </div>
        </header>
        {mode !== "" && 
            <WindowPopUp mode={mode} setMode={setMode} showMessage={showMessage}/>
        }
        {Object.keys(message).length !== 0 && <Message type={message.type} content={message.content}/>}
        </>
    )
}

export default Header