import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import authServices from "../../utils/AuthServices";
import { useState } from "react";
import ErrorMessageComponent from "../ErrorMessageComponent";
import Loader from "../Loader";
import {useNavigate} from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../store/authSlice";

const SignInForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleOnSumbit = async (value) => {
    setErrorMessage(null)
    setisLoading(true)

    try{
      await authServices.login(value);
      const userResponse = await authServices.getUser();
      dispatch(userLoggedIn(userResponse))
      navigate('/')
    } catch (err) {
      dispatch(userLoggedIn(null))
      setErrorMessage(err.message)
    } finally {
      setisLoading(false)
    }
  }


  return (
    <div>
      <div className="text-xl font-semibold tracking-wide">Login to Motion</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSumbit}
      > {({errors, touched}) => 
        <Form className="space-y-3 my-3">
          {errorMessage && <div><ErrorMessageComponent errorMessage={errorMessage}/></div>}
          <div className={`w-full border ${(errors.email && touched.email) ? 'border-red-200' : ''}`}>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="outline-none w-full px-3 py-2"
            />
          </div>

          <div className="px-2 text-sm font-semibold text-red-600"><ErrorMessage name="email"/></div>  

          <div className="w-full border flex pr-2">
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="outline-none w-full px-3 py-2"
            />

            {
              showPassword ? <button type="button" onClick={() => setShowPassword(false)} >
                <FaRegEyeSlash />
              </button> : <button type="button" onClick={() => setShowPassword(true)}>
                <FaRegEye />
              </button>
            }
            
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? <div className="w-full justify-center flex"><Loader /></div> : <div className="w-full">Login</div>}
          </Button>
        </Form> }
      </Formik>
    </div>
  );
};

export default SignInForm;
