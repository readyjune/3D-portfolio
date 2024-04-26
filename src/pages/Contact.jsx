import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import Fox from '../models/Fox'
import { useAlert } from '../hooks/useAlert'
import Alert from '../components/Alert'

const Contact = () => {

  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  const { alert, showAlert, hideAlert } = useAlert();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };
  const handleFocus = () => {
    setCurrentAnimation('walk');
  };
  const handleBlur = () => {
    setCurrentAnimation('idle');
  };
  const handleSubmit = () => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Jinwoo",
        from_email: form.email,
        to_email: 'rlawlsdn3314@gmail.com',
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: 'Your message has been sent!', type: 'success' })
      // TODO: Show success message
      // TODO: Hide an alert



      setTimeout(() => {
        setCurrentAnimation('idle');
        setForm({ name: '', email: '', message: '' });
      }, [3000]);

      setForm({ name: '', email: '', message: '' });
    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation('idle');
      console.log(error);
      showAlert({ show: true, text: 'Something went wrong. Please try again later.', type: 'danger' })
      // TODO: Show error message
    })
  };  

  return (
    <section className="relatvie flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert} />}
      {/* <Alert text="test" /> */}

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form 
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Jinwoo"
              required
              value={form.name}
              onChange={handleChange}    
              onFocus={handleFocus}
              onBlur={handleBlur}     
            >

            </input>
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Jinwoo@gmail.com"
              required
              value={form.email}
              onChange={handleChange}    
              onFocus={handleFocus}
              onBlur={handleBlur}     
            >
            </input>
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              row={4}
              className="input"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange}    
              onFocus={handleFocus}
              onBlur={handleBlur}     
            >
            </textarea>
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}

          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>

        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader />}>
            <Fox
            currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
 
        </Canvas>

      </div>
    </section>
  )
}

export default Contact