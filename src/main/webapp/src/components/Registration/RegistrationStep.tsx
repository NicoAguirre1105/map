import {
    ChangeEventHandler,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import styles from "./styles.module.css";
import { useOpenModalPopup } from "../../hooks/useOpenModalPopup";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../shared/API";
import axios from "axios";
import { useMutation } from "../../hooks/useMutation";

export const RegistrationStep = ({ nextStep }: { nextStep: () => void }) => {
    const [registrationForm, setLoginForm] = useState({
        name:"",
        email: "",
        password1: "",
        password2: "",
    });

    const navigate = useNavigate();

    const { mutate, isLoading, isError, data } = useMutation(() => {
        return axios.post(API_URL + "/register", {
            name: registrationForm.name,
            email: registrationForm.email,
            password: registrationForm.password1,
        });
    });

    const [errorCode, setErrorCode] = useState<null | string>(null);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            const { name, value } = e.target;
            setLoginForm((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        []
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate input and perform login logic here
        if (registrationForm.password1 !== registrationForm.password2) {
            setErrorCode("Пароли не совпадают");
            return;
        }
        mutate();
    };

    useEffect(() => {
        if (isError) {
            openPopup("login");
        }
    }, [isError, navigate]);
    const { openPopup } = useOpenModalPopup();

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Заполните данные:</h3>
            <input
                type="name"
                id="name"
                name="name"
                placeholder="Name"
                className={"main-input"}
                value={registrationForm.name}
                onChange={handleChange}
            />
            <input
                type="email"
                id="email"
                name="email"
                placeholder="somemail@gmail.com"
                className={"main-input"}
                value={registrationForm.email}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Придумайте пароль"
                id="password1"
                name="password1"
                className={"main-input"}
                value={registrationForm.password1}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Повторите пароль"
                id="password2"
                name="password2"
                className={"main-input"}
                value={registrationForm.password2}
                onChange={handleChange}
            />
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>
                    {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
                {errorCode && <p className={styles.error}>{errorCode}</p>}
            </div>
            <div className={styles.registrationLink}>
                Уже есть аккаунт?{" "}
                <span onClick={() => openPopup("login")}>Войти</span>
            </div>
        </form>
    );
};
