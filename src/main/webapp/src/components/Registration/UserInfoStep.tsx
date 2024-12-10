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
import { API_URL } from "../../shared/API";
import axios from "axios";

export const UserInfoStep = () => {
    const [userInfoForm, setLoginForm] = useState({
        firstName: "",
        lastName: "",
        university: "",
        personal: "",
    });

    const { mutate, isLoading, data, isError } = useMutation(() => {
        return axios.post(API_URL + "/user-info", userInfoForm);
    });

    const navigate = useNavigate();

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
        if (data && !isError) {
            navigate("/");
        }
    }, [data, navigate]);

    useEffect(() => {
        if (isError) {
            //обработка ошибка
        }
    }, [isError]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Заполните данные:</h3>
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Иван"
                className={"main-input"}
                value={userInfoForm.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Иванов"
                className={"main-input"}
                value={userInfoForm.lastName}
                onChange={handleChange}
            />
            <input
                type="text"
                id="university"
                name="university"
                placeholder="СПБГУ"
                className={"main-input"}
                value={userInfoForm.university}
                onChange={handleChange}
            />
            <input
                type="text"
                id="personal"
                name="personal"
                placeholder="Студент/преподаватель"
                className={"main-input"}
                value={userInfoForm.personal}
                onChange={handleChange}
            />

            <button type="submit" className={styles.submitButton}>
                {isLoading ? "Загрузка..." : "Готово"}
            </button>
        </form>
    );
};
