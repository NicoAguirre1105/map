import { useForm } from "../hooks/useForm"
import "./LoginForm.css"

interface FormProps {
    changeStep: () => void,
    changeMode: (newMode: string) => void
}

interface Form {
    email: string,
    password: string
}


const validateForm = (form: Form) => {
    let errors = {
        email:"",
        password:""
    }
    
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
    
    if(!form.email.trim()){
        errors.email = "This field must be filled"
    } else if (!regexEmail.test(form.email.trim())) {
        errors.email = "Email is not valid"
    }
    // Sumarle la verificacion de backend del correo

    if(!form.password){
        errors.password = "This field must be filled"
    } 
    // Sumarle la verificacion de password en backend
    
    return errors
}

const LoginForm = ({changeStep, changeMode}: FormProps) => {
    const  initialForm = {email:"", password:""}
    const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validateForm, changeStep)

    return (
        <>
            <form onSubmit={() => handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} value={form.email} required/>
                <div className="error-container">
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={form.password} required/>
                <div className="error-container">
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="options">
                    <p onClick={() => {changeMode("Password")}}>Forgot Password?</p>
                </div>
                <input type="submit" value="Login"/>
            </form>
            <span className="separator"></span>
            <div className="ext-login-container">
                <span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg> Google</span>
                <span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z"/></svg>VK</span>
            </div>
            <p>No account? <strong onClick={()=>{changeMode("Register")}}>Register now</strong></p>
        </>
    )
}

export default LoginForm