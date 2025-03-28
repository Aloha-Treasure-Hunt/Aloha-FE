'use client';
import React, { useState } from 'react';
import { LiaEyeSlashSolid } from 'react-icons/lia';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/AuthContext.js';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { loginApi, registerApi } from '@/components/api/loginApi.js';

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  role: string;
  email: string;
  fullName: string;
}

export default function LoginRegister() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email/Password is required!');
      return;
    }

    setLoading(true);
    try {
      const res = await loginApi(email, password);

      if (res?.data?.message?.statusCode === 200) {
        const { accessToken, refreshToken } = res.data.message.data;
        const decodedToken: CustomJwtPayload = jwtDecode(accessToken);

        // Lưu token vào localStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('id', decodedToken.sub);
        localStorage.setItem('userRole', decodedToken.role);
        localStorage.setItem('userEmail', decodedToken.email);

        // Lưu thông tin người dùng vào context
        login({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role,
          fullName: decodedToken.fullName,
        });

        toast.success('Login successful!');
        router.push('/homepage');
      } else {
        toast.error(res?.data?.message?.message || 'Login failed!');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again!');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    try {
      await registerApi(email, name, password, confirmPassword);

      toast.success('Registration successful! Redirecting to login...');
      setIsLogin(true);
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className='login'>
        {/* Nội dung thay đổi dựa trên trạng thái */}
        {isLogin ? (
          <div className='sm:w-1/2 px-12 py-10'>
            <h1 className='font-bold text-2xl text-[#4aa7e5] flex text-center justify-center'>
              LOGIN
            </h1>
            <button
              //   onClick={() => signIn('google', { callbackUrl: '/' })}
              className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-center text-sm'
            >
              <FcGoogle className='mr-3' />
              Login with Google
            </button>
            <button
              //   onClick={() => signIn('facebook', { callbackUrl: '/' })}
              className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-center text-sm'
            >
              <FaFacebookSquare className='mr-3 text-blue-700' />
              Login with Facebook
            </button>
            <div className='mt-6 grid grid-cols-3 items-center text-gray-500'>
              <hr className='border-gray-400' />
              <p className='text-center text-sm'>Or</p>
              <hr className='border-gray-400' />
            </div>
            {/* {error && <p className='text-red-500 text-sm'>{error}</p>} */}
            <form onSubmit={handleLogin} className='flex flex-col gap-4 mt-4'>
              <div>
                <span>
                  Email <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='text'
                  name='email'
                  placeholder='name@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='relative'>
                <span>
                  Password <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='password'
                  name='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <LiaEyeSlashSolid
                  fill='gray'
                  className='absolute top-1/2 right-3 -translate-y-1/2 font-bold'
                />
                <p className='text-xs mt-3 text-[#4aa7e5] underline cursor-pointer'>
                  Forgot your password?
                </p>
              </div>
              <button
                className='bg-[#4aa7e5] rounded-xl text-white py-2'
                type='submit'
              >
                {loading ? <ClipLoader size={15} color='#fff' /> : 'Login'}
              </button>
            </form>
            <div className='border-t-[1px] mt-4 border-[#9ca3af]'></div>
            <div className='flex mt-8 justify-center text-sm'>
              <p className='mr-1'>New to Aloha?</p>
              <button
                className='text-[#4aa7e5] underline'
                onClick={() => setIsLogin(false)}
              >
                {isLoading ? <ClipLoader size={15} color='#fff' /> : 'Register'}
              </button>
            </div>

            <div className='mt-8 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  Having trouble logging in?
                  <a href='' className='underline text-gray-600 font-bold'>
                    Aloha Help Center
                  </a>
                </p>
              </div>
            </div>

            <div className='mt-2 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  This site is protected by reCAPTCHA Enterprise and the Google
                  <a className='underline text-gray-600 font-bold' href=''>
                    Privacy Policy and Terms of Service
                  </a>
                  apply.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='sm:w-1/2 px-12 py-10'>
            <h2 className='font-bold text-2xl text-[#4aa7e5] flex text-center justify-center'>
              REGISTER
            </h2>
            {/* {error && <p className='text-red-500 text-sm'>{error}</p>} */}
            <form
              onSubmit={handleRegister}
              className='flex flex-col gap-4 mt-4'
            >
              <div>
                <span>
                  Email <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='email'
                  placeholder='name@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <span>
                  Username <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='text'
                  placeholder='Enter your username'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <span>
                  Password <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <span>
                  Confirm Password{' '}
                  <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='password'
                  placeholder='Re-enter your password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className='bg-[#4aa7e5] rounded-xl text-white py-2 my-2'
                type='submit'
              >
                Register
              </button>
            </form>
            <div className='border-t-[1px] mt-4 border-[#9ca3af]'></div>
            <div className='flex mt-8 justify-center text-sm'>
              <p className='mr-1'>Already have an account?</p>
              <button
                className='text-[#4aa7e5] underline'
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>

            <div className='mt-8 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  Having trouble logging in? 
                  <a href='' className='underline text-gray-600 font-bold'>
                    Aloha Help Center
                  </a>
                </p>
              </div>
            </div>

            <div className='mt-2 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  This site is protected by reCAPTCHA Enterprise and the Google
                  <a className='underline text-gray-600 font-bold' href=''>
                    Privacy Policy and Terms of Service
                  </a>
                  apply.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className='sm:block hidden w-1/2 p-5'>
          <img
            className='rounded-2xl h-[620px]'
            src='/assets/Side_Image/login_pic.jpg'
            alt='Side Illustration'
          />
        </div>
      </div>
    </section>
  );
}
