import { useEffect, useMemo, useState } from 'react'
import banner from '../../assets/imgs/banner1.jpg'
import { Form, Link, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import { auth, db } from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { isValidEmail } from '../Utils/utils'
import { ref, set } from 'firebase/database'
const SignUp = () => {
    const [value, setValue] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: ''
    })
    const navigation = useNavigation()
    const navigate = useNavigate()
    const { error , success = false } = useActionData() || {};
    const valueHandler = (e) => {
        const { name, value } = e.target
        setValue((prev => (
            { ...prev, [name]: value }
        )))
    }

    useEffect(()=>{
        if(success){
            navigate('/signin')
        }
    },[success,navigate])

    const status = useMemo(() => navigation.state === "submitting", [navigation.state]);
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
                <h2 className="text-2xl font-light text-center mb-8 text-gray-700">Sign Up</h2>
                <Form className='text-neutral-950' method='post'>
                    <div className="">
                        <input
                            type="text"
                            name='fullname'
                            placeholder="Full Name"
                            value={value.fullname}
                            className="w-full border border-gray-300 px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onChange={(e) => valueHandler(e)}
                        />
                        {error && error.fullname && <p className='text-red-600 text-[10px] mt-1 mb-2 ml-2'>{error.fullname}</p>}
                    </div>
                    <div className="">
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            value={value.email}
                            className="w-full border border-gray-300 px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onChange={(e) => valueHandler(e)}
                        />
                        {error && error.email && <p className='text-red-600 text-[10px] mt-1 mb-2 ml-2'>{error.email}</p>}
                    </div>
                    <div className="">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-400"
                            name='password'
                            value={value.password}
                            onChange={(e) => valueHandler(e)}
                        />
                        {error && error.password && <p className='text-red-600 text-[10px] mt-1 mb-2 ml-2'>{error.password}</p>}

                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Phone"
                            className="w-full border border-gray-300 px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-400"
                            name='phone'
                            value={value.phone}
                            onChange={(e) => valueHandler(e)}
                        />
                        {error && error.phone && <p className='text-red-600 text-[10px] ml-2 mt-1 mb-2'>{error.phone}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-800 transition-all"
                    >
                       {status ? 'LOGGED IN....': 'SIGN UP'} 
                    </button>
                </Form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Login?{" "}
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Click
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default SignUp

export const action = async ({ request }) => {
    const formData = await request.formData()
    const fullname = formData.get('fullname')
    const email = formData.get('email')
    const password = formData.get('password')
    const phone = formData.get('phone')
    const error = {}

    // check validata
    if (!email) {
        error.email = '(*) Không được để trống email'
    } else if (!isValidEmail(email)) {
        error.email = '(*) email không hợp lệ'
    }
    if (!password) {
        error.password = '(*) không được để trống pass'
    } else if (password.length <= 8) {
        error.password = '(*) password phải dài hơn 6 ký tự'
    }
    if (!fullname) error.fullname = "(*) không được để trống full name"
    if (!phone) error.phone = "(*) không được để trống phone"

    if (Object.keys(error).length > 0) {
        return {error};
    }

    try {
        const results = await createUserWithEmailAndPassword(auth, email, password)
        const result =  results.user.toJSON()

        // lưu vào trong table user 
        set(ref(db, 'users/' + result.uid), {
            fullname: fullname,
            email: email,
            phone: phone,
            timeCreated : new Date()
        });

        return { success: true };
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') error.email = "(*) email đã được sử dụng"
        return {error}
    }


}