"use client";

import { FC, useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

type Props = {
    setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name:Yup.string().required("Please add your name").min(3),
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
})

export const SignUpForm: FC<Props> = ({setRoute}) => {
    const [show, setShow] = useState(false);
    const [register, { isError,data, isSuccess,error}] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Account created successfully";
            toast.success(message);
            setRoute("Verification")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any
                toast.error(errorData?.data?.message) || "An error occurred";
            }
        }
    },[isSuccess,error])
    const formik = useFormik({
        initialValues: {name:"", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({name, email, password }) => {
            const data = { name, email, password }
            await register(data);
            setRoute("Verification")
        }
    })
    const { errors, values, touched, handleChange, handleSubmit} = formik;
    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl">Signup</h1>
            <p className="mb-4">Hey, sign up here with your name, email and password</p>
            <form onSubmit={handleSubmit}>
                <div className="py-2">
                <label className="text-center py-2 " htmlFor='email'>
                    Name
                </label>
                <input
                    type="text"
                    name=""
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="kay ofori"
                    className={`${errors.name && touched.name && "border-red-500"} w-full bg-transparent border rounded-lg outline-none mt-[10px] p-2 `}
                />
                {errors.name && touched.name && (
                    <span className="text-red-500 pt-2 block">{errors.name}</span>
                )}
                </div>
           
                <label className="text-center py-2" htmlFor='email'>
                    Enter your email
                </label>
                <input
                    type='email'
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="example@example.com"
                    className={`${errors.email && touched.email && "border-red-500"} w-full bg-transparent border rounded-lg outline-none mt-[10px] p-2  `}
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
                            value="Sign Up"
                            className={`flex flex-row justify-center py-3 px-6 rounded-lg cursor-pointer bg-blue-600 text-white dark:#ffffff dark:text-black w-full min-h-[45px] font-semibold`}
                        />
                </div>
            
                <h5 className=" text-center text-[14px] mt-3">
                        or
                    </h5>
                    <div className="flex items-center justify-center my-3 border p-2 cursor-pointer rounded-md hover:bg-black hover:text-white">
                        <FcGoogle className=" mr-2" />
                        <p>Sign in with google</p>
                    </div>
                    <h5 className="text-center pt-4 text-[14px]">
                        Already have an account?
                        <span className="text-[#4cab93] pl-1 cursor-pointer" onClick={() => setRoute("Login")}>
                            Login
                        </span>
                    </h5>
                </form>
            </div>
    );
};
