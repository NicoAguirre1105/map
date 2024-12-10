import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useCallback, useMemo, useState } from "react";
import { LoginStep } from "./LoginStep";
import { ForgottenPassword } from "./ForgottenPassword";

export type IStep = "login" | "verification" | "userInfo";

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClose = useCallback(() => {
        navigate(location.state?.backgroundLocation ?? "/");
    }, [location, navigate]);

    const [step, setStep] = useState(1);
    const nextStep = () => setStep((prev) => prev + 1);

    const title = useMemo(() => {
        switch (step) {
            case 1:
                return "Вход";
            case 2:
                return "Восстановление пароля";
            default:
                return "";
        }
    }, [step]);

    return (
        <div className={styles.popup}>
            <div className={styles.container}>
                <div className={styles.header}>
                    {title}
                    <span onClick={handleClose} className={styles.cross}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </span>
                </div>
                {step === 1 && <LoginStep nextStep={nextStep} />}
                {step === 2 && <ForgottenPassword />}
            </div>
        </div>
    );
};
