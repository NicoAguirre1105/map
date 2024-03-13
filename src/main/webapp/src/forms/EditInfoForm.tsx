import { useForm } from "../hooks/useForm";

interface FormProps {
    handleClick: Function,
    label: string
}

interface Form {
    email: string
}


export function EditInfoForm({handleClick, label}:FormProps){

    const validateForm = (form: Form) => {
        let errors = {email:""}

        const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

        if(!form.email.trim()){
            errors.email = "This field must be filled"
        } else if (label === "Email" && !regexEmail.test(form.email.trim())) {
            errors.email = "Email is not valid"
        }
        // Sumar la verificacion de que el correo consta en la base de datos

        return errors
    }

    const  initialForm = {email:""}
    const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validateForm, handleClick)

    return (
        <>
            <form onSubmit={() => handleSubmit}>
                <input type="text" name="email" placeholder={label} onChange={handleChange} onBlur={handleBlur} value={form.email}/>
                {errors.email && <p className="error-message">{errors.email}</p>}
                <input type="submit" value="Save"/>
            </form>
        </>
    )
}