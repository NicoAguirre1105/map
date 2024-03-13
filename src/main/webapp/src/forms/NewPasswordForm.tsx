import { useForm } from "../hooks/useForm";

interface FormProps {
    changeStep: Function
}

interface Form {
    password: string,
    repPassword: string
}

export function PasswordForm({changeStep}:FormProps){
    const validateForm = (form: Form) => {
        let errors = {password:"", repPassword:""}

        const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[ЁёА-яa-zA-Z0-9!@#$%^&*]{7,15}$/

        if(!form.password){
            errors.password = "This field must be filled"
        } else if(!regexPassword.test(form.password)){
            errors.password = "Password must have 7-15 characters and at least one number, one letter and one special characater"
        }
    
        if(!form.repPassword){
            errors.repPassword = "This field must be filled"
        } else if(form.password !== form.repPassword) {
            errors.repPassword = "Password must be equal"
        }
        
        return errors
    }

    const  initialForm = {password:"", repPassword:""}
    const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validateForm, changeStep)

    return (
        <>
            <form onSubmit={() => handleSubmit}>
                <p className="copy-text">Please enter your new password</p>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={form.password}/>
                <div className="error-container">
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <input type="password" name="repPassword" placeholder="Repeat password" onChange={handleChange} onBlur={handleBlur} value={form.repPassword}/>
                <div className="error-container">
                    {errors.repPassword && <p className="error-message">{errors.repPassword}</p>}
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}