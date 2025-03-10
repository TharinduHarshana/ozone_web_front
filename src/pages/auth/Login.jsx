import CommonForm from "@/components/common-view/form";
import { loginFormContrls} from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const initilState = {
    email : '',
    password : ''
}

function AuthLogin() {
    const [formData, setFormData] = useState(initilState);
    const dispatch = useDispatch();
    const {toast} = useToast();

    function onSubmit () {
        event.preventDefault();
        dispatch(loginUser(formData)).then((formData) => {
            if (formData.payload.success) {
                toast({
                    type: 'success',
                    title: formData.payload.message
                });
            }else {
                toast({
                    type: 'error',
                    title: formData.payload.message
                });
            }
        })
    }

    
    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in your account</h1>
                <p>Don't Have an Account</p>
                <Link 
                    className="font-medium ml-2 text-primary hover:underline" 
                    to='/auth/register'>Register</Link>
            </div>
            <CommonForm
                formControls={loginFormContrls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthLogin;