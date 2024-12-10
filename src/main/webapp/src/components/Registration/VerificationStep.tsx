import {
    ChangeEventHandler,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import styles from "./styles.module.css";
import { useOpenModalPopup } from "../../hooks/useOpenModalPopup";
import { useMutation } from "../../hooks/useMutation";
import { API_URL } from "../../shared/API";
import axios from "axios";

export const VerificationStep = ({ nextStep }: { nextStep: () => void }) => {
    const [codeForm, setLoginForm] = useState({
        code: "",
    });

    const { mutate, isLoading, data, isError } = useMutation(() => {
        return axios.post(API_URL + "/verify-code", codeForm);
    });

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
            nextStep();
        }
    }, [data, nextStep]);

    useEffect(() => {
        if (isError) {
            //обработка ошибка
        }
    }, [isError]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h5>
                Пожалуйста введите 6-значный код, который пришел к вам на почту,
                указанную в прошлом пункте:
            </h5>

            <input
                type="text"
                id="code"
                name="code"
                placeholder="123456"
                className={"main-input"}
                value={codeForm.code}
                onChange={handleChange}
            />

            <button type="submit" className={styles.submitButton}>
                Проверить код
            </button>
        </form>
    );
};
