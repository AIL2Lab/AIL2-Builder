"use client";

import { useTranslations } from "next-intl";
import { ChangeEvent, FormEvent, useState } from "react";

export default function ContactForm() {
  const t = useTranslations("Contact")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="bg-[#111111] rounded-xl p-8 md:p-12 border border-white/8 hover:border-theme/80 hover:-translate-y-2 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">{t('form.name.col')}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
            placeholder={t('form.name.placeholder')}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">{t('form.email.col')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
            placeholder={t('form.email.col')}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">{t('form.message.col')}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            rows={6}
            placeholder={t('form.message.placeholder')}
          />
        </div>
        <button
          type="submit"
          className="text-black transition-all duration-300 hover:scale-105 hover:bg-white  w-full bg-theme font-semibold py-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
        >
          {t('sendBtn')}
        </button>
      </form>
    </div>
  );
}
