import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import authServices from "../../utils/AuthServices";
import Loader from "../Loader";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import { userLoggedIn } from "../../store/authSlice";

const SignUpForm = () => {


  // Using Formik Component and Yup to validate the form
  const [showPassword, setShowPassword] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [isLoad, setisLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const validateSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const handleOnSumbit = async (value) => {
    setisLoad(true)
    setErrorSignUp(null)

    // Create Account Logic 
    try{
      const response = await authServices.createAccount(value)
      dispatch(userLoggedIn(response))
      navigate('/')
    } catch (err) {
      dispatch(userLoggedIn(null))
      setErrorSignUp(err.message)
    } finally {
      setisLoad(false)
    }
  }

  return (
    <div>
      <div className="text-xl tracking-wide font-semibold">
        Create An Account
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validateSchema}
        onSubmit={handleOnSumbit}
      >
        <Form className="space-y-3 my-3">
          {errorSignUp && <div className="bg-red-700 text-white px-2 py-1 rounded font-semibold">{errorSignUp}</div>}
          <div className="w-full border">
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="outline-none w-full px-3 py-2"
            />
          </div>

          <div className="w-full border">
            <Field
              name="email"
              text="email"
              placeholder="Email"
              className="outline-none w-full px-3 py-2"
            />
          </div>

          <div className="px-2 text-sm font-semibold text-red-600">
            <ErrorMessage name="email" component="div" />
          </div>

          <div className="w-full border flex items-center pr-2">
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="outline-none w-full px-3 py-2"
            />
            {showPassword ? (
              <button onClick={() => setShowPassword(false)} type="button">
                <FaRegEyeSlash />
              </button>
            ) : (
              <button onClick={() => setShowPassword(true)} type="button">
                <FaRegEye />
              </button>
            )}
          </div>

          <div className="px-2 text-sm font-semibold text-red-600">
            <ErrorMessage name="password" component="div" />
          </div>

          <Button type="sumbit" className="w-full">
            {
              isLoad ? <div className="w-full flex justify-center">
                <Loader />
              </div> : <div className="w-full">Create Account</div>
            }
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
