"use client";

import { FC, useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import {signIn} from "next-auth/react";

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
})

export const LoginForm: FC<Props> = ({setRoute, setOpen}) => {
    const [show, setShow] = useState(false);
    const[login,{isError,isSuccess,error}] = useLoginMutation();
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
           await login({ email, password });
        }
    })
    const { errors, values, touched, handleChange, handleSubmit } = formik;
    
    useEffect(()=>{
        if (isSuccess) {
            toast.success("Login successful");
            setOpen(false)
        } 
        if (error) {
            if ("data" in error) {
                const errorData = error as any
                toast.error(errorData?.data?.message) || "An error occurred";
            }
        }
    },[isSuccess,error])
    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl">Login</h1>
            <p className="mb-4">Hey, sign in here with your email and password</p>
            <form onSubmit={handleSubmit}>
                <label className="text-center py-2 " htmlFor='email'>
                    Enter your email
                </label>
                <input
                    type='email'
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="example@example.com"
                    className={`${errors.email && touched.email && "border-red-500"} w-full bg-transparent border rounded-lg outline-none mt-[10px] p-2 `}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                <div className=" w-full mt-5 relative mb-1">
                    <label className="text-center py-2" htmlFor='password'>
                        Password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="*********"
                        className={`${errors.password && touched.password && "border-red-500"} w-full bg-transparent border rounded-lg outline-none mt-[10px] p-2 `}
                    />
                    {!show ? (
                        <EyeClosed
                            size={20}
                            className="absolute bottom-3 right-2 flex cursor-pointer" onClick={() => setShow(true)} />
                        ) : (
                            <Eye size={20} className="absolute bottom-3 right-2 flex cursor-pointer" onClick={() => setShow(false)} />
                        )}
                      
                    </div>
                    {errors.password && touched.password && (
                            <span className="text-red-500 pt-2 block">{errors.password}</span>
                        )}
                    <div className="w-full mt-5">
                        <input
                            type="submit"
                            value="Login"
                            className={`flex flex-row justify-center py-3 px-6 rounded-lg cursor-pointer bg-blue-600 text-white dark:#ffffff dark:text-black w-full min-h-[45px] font-semibold`}
                        />
                </div>
            
                <h5 className=" text-center text-[14px] mt-3">
                        or
                    </h5>
                    <div className="flex items-center justify-center my-3 border p-2 cursor-pointer rounded-md hover:bg-black hover:text-white ml-auto mr-auto" onClick={()=>signIn("google")}>
                        <FcGoogle className=" mr-2" />
                        <p>Sign in with google</p>
                    </div>
                    <h5 className="text-center pt-4 text-[14px]">
                        Do not have an account?
                        <span className="text-blue-500] pl-1 cursor-pointer" onClick={() => setRoute("sign-up")}>
                            Sign Up
                        </span>
                    </h5>
                </form>
            </div>
    );
};
