import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {

  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };
  const handleFocus = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  const handleBlur = () => {};
  const handleSubmit = () => {};  

  return (
    <section className="relatvie flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form 
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <labe className="text-black-500 font-semibold">
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
          </labe>
          <labe className="text-black-500 font-semibold">
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
          </labe>
          <labe className="text-black-500 font-semibold">
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
          </labe>
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
    </section>
  )
}

export default Contact