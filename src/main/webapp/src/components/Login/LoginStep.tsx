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
import { useMutation } from "../../hooks/useMutation";
import axios from "axios";
import { API_URL } from "../../shared/API";

export const LoginStep = ({ nextStep }: { nextStep: () => void }) => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const { mutate, isLoading, isError, data } = useMutation<{ data:{token: string}}>(
        () => {
            return axios.post(API_URL + "/login", {
                email: loginForm.email,
                password: loginForm.password,
            });
        }
    );

    const navigate = useNavigate();
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
        mutate();
    };

    useEffect(() => {
        console.log(data)
        if (data && !isError) {
            localStorage.setItem("token", data.data.token);
            navigate("/");
        }
    }, [data, navigate]);

    useEffect(() => {
        if (isError) {
            setErrorCode("Неверный логин или пароль");
        }
    }, [isError]);

    const { openPopup } = useOpenModalPopup();

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Заполните данные:</h3>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="somemail@gmail.com"
                className={"main-input"}
                value={loginForm.email}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Придумайте пароль"
                id="password"
                name="password"
                className={"main-input"}
                value={loginForm.password}
                onChange={handleChange}
            />
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>
                    {isLoading ? "Загрузка..." : "Войти"}
                </button>
                {errorCode && <p className={styles.error}>{errorCode}</p>}
            </div>
            <div className={styles.registrationLink}>
                Ещё нет аккаунта?{" "}
                <span onClick={() => openPopup("registration")}>
                    Зарегистрироваться
                </span>
            </div>
            <div className={styles.forgottenPassword} onClick={nextStep}>
                Забыли пароль?
            </div>
        </form>
    );
};
