'use client'

import { ChangeEvent, FormEvent, useState } from "react"




export default function ContactForm() {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
    return (
        <div className="bg-[#111111] rounded-xl p-8 md:p-12">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                      rows={6}
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-theme font-semibold py-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
    )
}