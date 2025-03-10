import CommonForm from "@/components/common-view/form";
import { registerFormContrls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    userName: '',
    email: '',
    password: ''
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector(state => state.auth);
    const {toast}= useToast();

    async function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((result) => {
            if (registerUser.fulfilled.match(result)) {
                navigate("/auth/login");
                toast({
                    title: "Account created successfully",
                    type: "success"
                });
            }else{
                toast({
                    title: "Error",
                    description: result.payload.message,
                    variant : "destructive"
                });
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
                <p>Already have an account?</p>
                <Link 
                    className="font-medium ml-2 text-primary hover:underline" 
                    to='/auth/login'>Login</Link>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error.message}</p>}

            <CommonForm
                formControls={registerFormContrls}
                buttonText={isLoading ? 'Signing Up...' : 'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
