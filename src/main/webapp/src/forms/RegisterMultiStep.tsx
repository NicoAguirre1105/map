import { useState } from "react"
import RegisterForm from "./RegisterForm"
import VerificationForm from "./VerificationForm"
import UserInfoForm from "./UserInfoForm"

interface LayoutProps {
    setWindow: React.Dispatch<React.SetStateAction<string>>
}

const RegisterMultiStep = ({setWindow}:LayoutProps) => {
    

    const changeStep = () => {
        if (step === 2) {
            setWindow("")
        }
        setStep(step + 1);
    }

    const [step, setStep] = useState(0)

    return (
        <>
        {step === 0 && <RegisterForm setWindow={setWindow} changeStep={changeStep}/>}
        {step === 1 && <VerificationForm changeStep={changeStep}/>}
        {step === 2 && <UserInfoForm changeStep={changeStep}/>}
        </>
    )
}   

export default RegisterMultiStep