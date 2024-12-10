import {
    ChangeEventHandler,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "../../hooks/useMutation";
import { API_URL } from "../../shared/API";
import axios from "axios";

export const ForgottenPassword = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
    });

    const navigate = useNavigate();

    const { mutate, isLoading, isError, data } = useMutation<{ token: string }>(
        () => {
            return axios.post(API_URL + "/forget-password", {
                email: loginForm.email,
            });
        }
    );

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
        if (data && !isLoading && !isError) {
            localStorage.setItem("token", data.token);
            navigate("/login");
        }
    }, [data, navigate]);

    useEffect(() => {
        if (isError) {
            // Обработка ошибки
        }
    }, [isError]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h5>
                Пожалуйста введите почту, на которую будет отправлена ссылка для
                восстановления пароля:
            </h5>

            <input
                type="email"
                id="email"
                name="email"
                placeholder="somemail@gmail.com"
                className={"main-input"}
                value={loginForm.email}
                onChange={handleChange}
            />

            <button type="submit" className={styles.submitButton}>
                {isLoading ? "Загрузка..." : "Отправить"}
            </button>
        </form>
    );
};
