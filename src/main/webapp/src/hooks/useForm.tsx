import { useState } from "react";
import axios from "../route/axios";

interface Form_prompt {
    email?: string,
    password?: string,
    repPassword?: string,
    code?: string,
    name?: string,
    lastName?: string,
    org?: string,
    role?: string
}

interface FormReturn {
    form: Form_prompt,
    errors: Form_prompt,
    loading: boolean,
    response: number,
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void,
    handleBlur: (e: React.FormEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<FormElement>) => void
}

interface FormElements extends HTMLFormControlsCollection {
    userInput: HTMLInputElement
  }

interface FormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export function useForm(
    initialForm: Form_prompt, 
    validateForm: Function, 
    submit: Function,
    type: string
    ): FormReturn{
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(0)
    const [tried, setTried] = useState(false)

    const rel_url = (t:string):string => {
        switch (t) {
            case "Login":
                return "/login"
            case "Register":
                return "/register"
            case "User Information":
                return ""
            case "Verification_reg":
                return "/registration/confirm"
            case "New Password":
                return "/reset-password"
            // case "Email":
            //     break
            // case "Edit Information":
            //     form = <EditInfoForm changeStep={changeStep}/>
            //     break 
            default:
                return ""
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setForm({...form, [name]: value})
    };

    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        handleChange(e)
        if(tried){
            setErrors(validateForm(form))
        }
    };

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        setTried(true)
        let temp_errors = validateForm(form) 
        setErrors(temp_errors)

        if(Object.keys(temp_errors).length === 0){
            setLoading(true)
            try {
                console.log(form)
                const res = await axios.post("/login", JSON.stringify({email:"user@gmail.com", password:"100"}), 
                {
                    headers: {
                        'Content-Type': 'aplication/json'
                    },
                    withCredentials: true
                })
                console.log(res.data)
            } catch (error) {
                console.log("Error with server")
            }
            setLoading(false)
            setResponse(1)
            submit()
            // setTimeout(() => {
            //     setResponse(2)
            //     alert("recibido")
            // }, 5000)
        } else {
            return {}
        }
    };

    return{form, errors, loading, response, handleChange, handleBlur, handleSubmit}

}