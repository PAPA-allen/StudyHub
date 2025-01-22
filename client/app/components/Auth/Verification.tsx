import { useActivationMutation } from '@/redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

type Props = {
    setRoute: (route: string) => void;
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}
const Verification: FC<Props> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activation, {error, isSuccess}]= useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    })

    const inputRefs = [ 
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]
    useEffect(() => { 
        if (isSuccess) {
            toast.success("Account activated successfully");
            setRoute("Login")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message) || "An error occurred";
                setInvalidError(true)
            } else {
                console.log("An error occured", error);
            }
        }
    },[isSuccess,error])
   
    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length < 4) {
            setInvalidError(true)
            return;
        }
        await activation({ activation_token: token, activation_code: verificationNumber })
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)
        const newVerifyNumber = { ...verifyNumber, [index]: value }
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus()
        }else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }
  return (
      <div>
          <h1 className="font-bold text-2xl text-center py-2">Verify your account</h1>
          <div className="w-full items-center justify-center mt-2">
              <div className="md:w-[70%] m-auto flex items-center justify-around">
                  {Object.keys(verifyNumber).map((key, index) => (
                      <input
                          key={key}
                          ref={inputRefs[index]}
                          type="text"
                          value={verifyNumber[key as keyof VerifyNumber]} 
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          maxLength={1}
                          className={` ${invalidError ? "border-red-500":null} w-12 h-12 text-center border border-gray-300 rounded-lg`}
                      />
                  ))}
              </div>
          </div>
          <br/>
          <div>
                <button className={`flex flex-row justify-center items-center py-3 px-6 rounded-md bg-blue-500 border min-h-[45px] w-[70%] mx-auto hover:ring-2 ring-black`} onClick={verificationHandler}>Verify OTP</button>
            </div>
            <br/>

            <h5 className="text-center">
                Redirect to Sign in? {" "}<span className="cursor-pointer text-blue-500" onClick={() => setRoute("Login")}>Sign In</span>
            </h5>
      </div>
  )
}

export default Verification