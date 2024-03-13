import { useState } from "react"
import "./Avatar.css"

// TODO: Handle click outside avatar-menu (close menu if it i open with function that is created only if menu is open to avoid checking every click)

export function Avatar() {

    const [menu, setMenu] = useState(false)

    const handleAvatar = () => {
        setMenu(!menu)
    }

    return (
        <>
        <div className="avatar" onClick={handleAvatar}>
            {"M"}
        </div>
        {menu && <div className="avatar-menu">
            <ul>
                <li><a href="./Profile">Account</a></li>
                <li><a href="./Profile">Preferences</a></li>
                <li><a href="./Profile">Sign out</a></li>
            </ul>
        </div>}
        </>
    )
}