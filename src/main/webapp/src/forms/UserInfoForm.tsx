import { useForm } from "../hooks/useForm";

interface FormProps {
    changeStep: Function
}

interface Form {
    name: string,
    lastName: string,
    org: string,
    role: string,
}

interface Errors {
    name?: string,
    lastName?: string,
    org?: string,
    role?: string,
}


const UserInfoForm = ({changeStep}: FormProps) => {
    const validateForm = (form: Form) => {
        let errors:Errors = {}
        
        if(!form.name.trim()){
            errors.name = "This field must be filled"
        }
        if(!form.lastName.trim()){
            errors.name = "This field must be filled"
        }
        
        return errors
    }

    const  initialForm = {name:"", lastName:"", org:"None", role:"None"}
    const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validateForm, changeStep, "")

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} onBlur={handleBlur} value={form.name}/>
                <div className="error-container">
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} value={form.lastName}/>
                <div className="error-container">
                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                </div>
                <input type="text" name="org" placeholder="Organization" onChange={handleChange} onBlur={handleBlur} value={form.org}/>
                <div className="error-container">
                    {errors.org && <p className="error-message">{errors.org}</p>}
                </div>
                <input type="text" name="role" placeholder="Role" onChange={handleChange} onBlur={handleBlur} value={form.role}/>
                <div className="error-container">
                    {errors.role && <p className="error-message">{errors.role}</p>}
                </div>
                <input type="submit" value="Done"/>
            </form>
        </>
    )
}

export default UserInfoForm