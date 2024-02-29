import { useState } from "react"
import SignInForm from "../Components/AuthComponent/SignInForm"
import SignUpForm from "../Components/AuthComponent/SignUpForm"
import Container from "../Components/Container"
import Logo from "../Components/Logo"
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const AuthPage = () => {

    const user = useSelector((store) => store.auth?.user)
    const navigate = useNavigate()

    if(user) navigate('/')

    const [switchForm, setSwitchForm] = useState('signin')

  return (
    <Container className="flex justify-center items-center h-screen">
        <div className="max-w-md border w-full px-2 py-3 -translate-y-20">
            <div>
                <Logo />
            </div>

            <div className="px-2 py-1">
                {switchForm === 'signin' && <SignInForm />}    
                {switchForm === 'signup' && <SignUpForm />}

                <div className="py-2 float-right">
                    {switchForm === 'signin' && <button className="text-sm font-semibold" onClick={() => setSwitchForm('signup')}>Not An Account?</button>}
                    {switchForm === 'signup' && <button className="text-sm font-semibold" onClick={() => setSwitchForm('signin')}>Already Account?</button>}
                </div>
            </div>    

        </div>
    </Container>
  )
}

export default AuthPage