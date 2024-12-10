import { link } from "fs";
import styles from "./styles.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOpenModalPopup } from "../../hooks/useOpenModalPopup";
import { useState } from "react";

const links = [
    {
        label: "Главная",
        value: "home",
    },
    {
        label: "Контакты",
        value: "about",
    },
    {
        label: "Наборы правил",
        value: "presets",
    },
    {
        label: "Загрузка файлов",
        value: "download",
    },
];

const loginLinks = [
    {
        label: "Войти",
        value: "login",
    },
    {
        label: "Регистрация",
        value: "registration",
    },
];

export const Navbar = () => {
    const { openPopup } = useOpenModalPopup();
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const handleAvatar = () => {
        setMenu(!menu)
    }

    const IconLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map(({ label, value }) => (
                    <NavLink
                        to={`/${value}`}
                        key={value}
                        className={styles.link}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
            {localStorage.getItem("token") ? 
                <>
                <div 
                    className={cn(
                        styles.avatar
                    )} 
                    onClick={handleAvatar}>
                    {"M"}
                </div>
                {menu && <div 
                    className={cn(
                        styles.avatarMenu
                    )}>
                    <ul>
                        <li><a href="./home">Профиль</a></li>
                        <li><a href="./home">Подписка</a></li>
                        <li><a onClick={IconLogout}>Выйти</a></li>
                    </ul>
                </div>}
                </> : 
                <div className={styles.loginButtons}>
                {loginLinks.map(({ value, label }) => (
                    <div
                        onClick={() => openPopup(value)}
                        key={value}
                        className={cn(
                            styles[`link_${value}`],
                            styles.buttonLink
                        )}
                    >
                        {label}
                    </div>
                ))}
            </div>}
        </div>
    );
};
