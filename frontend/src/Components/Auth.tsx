import { signupInput } from "@jakex123/medium-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [inputs, setInputs] = useState<signupInput>({
    email: "",
    password: "",
    name: "",
  });
  return (
    <div className={`h-screen flex flex-col justify-center items-center ${type==="signup" && "mx-4"}`}>
      <div className="lg:max-w-lg">
        <div className="text-4xl font-extrabold text-center px-6">
        {type==="signup"?"Create an Account":"Welcome Back"}
        </div>
        <div className="text-center text-lg font-normal text-gray-500 mt-2 mb-6">
         {type==="signup"? "Already have an account?":"Don't have an account?"}<Link className="underline px-2" to={type==="signup"?"/signin":"/signup"}>{type==="signup"?"Login":"Sign Up"}</Link>
        </div>
        {type==="signup" && <LabelledInput
          label="Name"
          placeholder="Enter Your Name"
          onChange={(e) => {
            setInputs((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />}
        <LabelledInput
          label="Email"
          placeholder="x@example.com"
          onChange={(e) => {
            setInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="Password"
          type={"password"}
          onChange={(e) => {
            setInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
        />
        <button className="w-full py-2 rounded-md text-white bg-black">{type==="signup"?"Sign Up":"Sign In"}</button>
      </div>
    </div>
  );
};

interface labelledInputType {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?:string;
}

const LabelledInput = ({ label, placeholder, onChange,type }: labelledInputType) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id={label}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-500 placeholder:font-normal"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
