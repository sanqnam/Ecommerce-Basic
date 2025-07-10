import { useEffect, useMemo, useState } from 'react'
import banner from '../../assets/imgs/banner1.jpg'
import { Form, Link, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import { auth, dbRef } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { get, child } from 'firebase/database'
import { setLocalStorage } from '../Utils/utils'
import { useDispatch } from 'react-redux'
import { login } from '../../stores/user'

const SignIn = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    const { error, succes = false, result } = useActionData() || {}
    const navigation = useNavigation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const valueHandler = (e) => {
        const { name, value } = e.target
        setValue((prev => (
            { ...prev, [name]: value }
        )))
    }


    const status = useMemo(() => navigation.state === "submitting", [navigation.state])

    useEffect(() => {
        const fetchUser = async () => {
            if (succes === true && result?.uid) {

                try {

                    const data = await get(child(dbRef, `users/${result.uid}`))
                    let user = data.toJSON()
                    user = { ...user, id: `${result.uid}` }
                    setLocalStorage('user', user)
                    setLocalStorage('token', result.stsTokenManager.accessToken)
                    dispatch(login(user))

                    navigate('/')


                } catch (err) {
                    console.log('Lỗi lấy dữ liệu người dùng', err)

                }
            } else if (!succes) {
                setValue(prev => ({ ...prev, password: '' }))
            }
        }
        fetchUser()
    }, [succes, result, error])


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
            {/* Image Decor */}
            <img
                src={banner}
                alt={banner}
                className="absolute top-0 left-0 w-full h-full object-cover hidden md:block z-0"
            />

            {/* Sign-in Card */}
            <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-sm z-10">
                <h2 className="text-2xl font-light text-center mb-8 text-gray-700">Sign In</h2>

                <Form className='text-neutral-950' method='post'>
                    <div className="mb-4">
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            value={value.email}
                            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onChange={(e) => valueHandler(e)}
                        />
                        {error && error.email && <p className='text-red-600 text-[10px] mt-1 mb-2 ml-2'>{error.email}</p>}
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                            name='password'
                            value={value.password}
                            onChange={(e) => valueHandler(e)}
                        />
                        {error && error.password && <p className='text-red-600 text-[10px] mt-1 mb-2 ml-2'>{error.password}</p>}
                    </div>
                    {error && error.code && <p className='text-red-600 text-center text-[14px] mt-1 mb-2 ml-2'>{error.code}</p>}

                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-800 transition-all"
                    >
                        {status ? 'Logged in...' : "SIGN IN"}
                    </button>
                </Form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Create an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        SIGN UP
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default SignIn

export const action = async ({ request }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const error = {}
    console.log('sssss')
    if (!email) error.email = 'Không được để trống email'
    if (!password) error.password = 'không được để trống pass'
    if (Object.keys(error).length !== 0) return { error }
    try {
        const results = await signInWithEmailAndPassword(auth, email, password)
        const result = results.user.toJSON()
        console.log('user', result)
        return { succes: true, result }
    } catch (err) {
        console.log('err', err.code)
        if (err.code === "auth/invalid-credential") error.code = "Sai email hoặc mật khẩu"
        return { error }
    }
}