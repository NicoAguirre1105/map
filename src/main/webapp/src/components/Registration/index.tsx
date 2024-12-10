import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useCallback, useState } from "react";

import { RegistrationStep } from "./RegistrationStep";
import { VerificationStep } from "./VerificationStep";
import { UserInfoStep } from "./UserInfoStep";

export type IStep = "login" | "verification" | "userInfo";

export const Registration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClose = useCallback(() => {
        navigate(location.state?.backgroundLocation ?? "/");
    }, [location, navigate]);

    const [step, setStep] = useState(1);
    const nextStep = () => setStep((prev) => prev + 1);

    return (
        <div className={styles.popup}>
            <div className={styles.container}>
                <div className={styles.header}>
                    Регистрация
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
                {step === 1 && <RegistrationStep nextStep={nextStep} />}
                {step === 2 && <VerificationStep nextStep={nextStep} />}
                {step === 3 && <UserInfoStep />}
            </div>
        </div>
    );
};
