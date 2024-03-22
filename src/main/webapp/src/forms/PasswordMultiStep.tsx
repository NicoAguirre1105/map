import { useState } from "react"
import PasswordForm from "./PasswordForm"
import VerificationForm from "./VerificationForm"
import EmailForm from "./EmailForm"

interface LayoutProps {
    setWindow: React.Dispatch<React.SetStateAction<string>>
}

const PasswordMultiStep = ({setWindow}:LayoutProps) => {
    

    const changeStep = () => {
        if (step === 2) {
            setWindow("")
        }
        setStep(step + 1);
    }

    const [step, setStep] = useState(0)

    return (
        <>
        {step === 0 && <EmailForm changeStep={changeStep}/>}
        {step === 1 && <VerificationForm changeStep={changeStep}/>}
        {step === 2 && <PasswordForm changeStep={changeStep}/>}
        </>
    )
}   

export default PasswordMultiStep