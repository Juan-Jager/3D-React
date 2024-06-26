import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import UseAlert from '../hooks/UseAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setform] = useState({name : '', email: '', message: ''});
  const [isLoading, setisLoading] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState('idle');
  const {alert, showAlert, hideAlert} = UseAlert()

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }
  const  handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    setcurrentAnimation('hit');


    console.log("Service ID:", import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
  console.log("Template ID:", import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID);
  console.log("Public Key:", import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);

    emailjs.send(

      // !!!!NON MOSTRARE QUESTE INFO, USARE LE VARIABILI IN ENV.LOCAL!!!!!
      'service_s7f0xap',
      'template_woy4lsm',
      {
        from_name : form.name,
        to_name : 'juan',
        from_email: form.email,
        to_email: 'giovanni.dalgrosso@gmail.com',
        message: form.message
      },
      'ELGWRm-up1hCABrRJ'

    ).then(()=>{
      setisLoading(false);
      showAlert({show: true, text:'message send successfuly', type: 'success'})

      setTimeout(()=>{
        hideAlert()
        setcurrentAnimation('idle');
        setform({name : '', email: '', message: ''})

      }, 3000)


    }).catch((error)=>{
      setisLoading(false);
      setcurrentAnimation('idle');
      console.log(error);
      showAlert({show: true, text:'error!!!!!!', type: 'danger'})

    })

  }
  const handleFocus = () => {
    setcurrentAnimation('walk');
  }
  const handleBlur = () => {
    setcurrentAnimation('idle');
  }


  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert}/>}
  
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>juan</h1>
        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
          <label htmlFor="" className='text-black-500 font-semibold'>
            name
            <input type="text" name='name' className='input' placeholder='jhon' required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <label className='text-black-500 font-semibold'>
            email
            <input type="email" name='email' className='input' placeholder='jhon@gmail.com' required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <label  className='text-black-500 font-semibold'>
            your message
            <textarea  name='message' rows={4} className='textarea' placeholder='let me know how can i help you ' required value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <button
          type='submit'
          className='btn'
          disabled={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}

          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>

        <Canvas
        camera={{
          position:[0,0,5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5}/>
          <Suspense fallback={null}>
            <Fox 
            position={[0.5, 0.35, 0]}
            rotation={[12.6, -0.6, 0]}
            scale={[0.5, 0.5, 0.5]}
            currentAnimation={currentAnimation}
            />
          </Suspense>
        </Canvas>

      </div>
    </section>
  )
}

export default Contact