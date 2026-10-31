"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/lib/personalInfo";

function getFormspreeUrl(endpoint: string): string {
  if (!endpoint || endpoint === "YOUR_FORMSPREE_ENDPOINT") {
    return "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT";
  }
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  return `https://formspree.io/f/${endpoint}`;
}

export default function Contact() {
  const [form, setForm] = useState({ email: "", query: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ email?: string; query?: string }>({});
  const [serverMessage, setServerMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors: { email?: string; query?: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!validateEmail(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.query.trim()) {
      newErrors.query = "Please enter your query or message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage("");

    if (!validate()) {
      return;
    }

    // Honeypot spam trap
    if (form.honeypot) {
      setStatus("success");
      setForm({ email: "", query: "", honeypot: "" });
      return;
    }

    setStatus("loading");

    const endpoint = getFormspreeUrl(personalInfo.formspreeEndpoint);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          message: form.query.trim(),
          _gotcha: form.honeypot,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setServerMessage("Thank you! Your message has been sent successfully.");
        setForm({ email: "", query: "", honeypot: "" });
        setErrors({});
      } else {
        const data = await response.json().catch(() => ({}));
        let msg = "Failed to send message. Please try again.";

        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          msg = data.errors
            .map((err: { message?: string; field?: string }) => err.message)
            .filter(Boolean)
            .join(". ");
        } else if (data.error) {
          msg = data.error;
        }

        if (endpoint.includes("YOUR_FORMSPREE_ENDPOINT") || response.status === 404) {
          msg = "Formspree endpoint not configured. Please add your Formspree Form ID in .env.local (NEXT_PUBLIC_FORMSPREE_ENDPOINT).";
        }

        setStatus("error");
        setServerMessage(msg);
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error occurred while sending your message. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-neutral-950 flex flex-col justify-center py-24 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="font-bebas text-[22vw] md:text-[25vw] leading-none text-white/5 font-normal tracking-tighter text-center">
          CONTACT
        </h2>
      </div>

      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Direct Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-accent" />
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-accent font-bold">
                Get In Touch
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-bebas text-6xl md:text-9xl text-white leading-[0.9]"
            >
              LET&apos;S WORK <br />{" "}
              <span className="text-neutral-500">TOGETHER</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                <Mail size={14} className="text-accent" />
                <span>Email me</span>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-white text-base md:text-lg hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
              >
                {personalInfo.email}
                <ArrowUpRight
                  size={16}
                  className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                />
              </a>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                <MapPin size={14} className="text-accent" />
                <span>Location</span>
              </div>
              <p className="text-white text-base md:text-lg">{personalInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-accent/20 blur-3xl opacity-20 pointer-events-none" />
          <form
            noValidate
            onSubmit={handleSubmit}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 space-y-6 md:space-y-8 shadow-2xl"
          >
            {/* Hidden Honeypot Spam Protection Field */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="hp_field">Do not fill this field</label>
              <input
                id="hp_field"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              />
            </div>

            <div className="space-y-6">
              {/* Email Address */}
              <div className="space-y-2 group">
                <label className="text-[11px] md:text-[10px] uppercase tracking-widest text-neutral-400 pl-4 group-focus-within:text-accent transition-colors">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full bg-white/5 border rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:bg-white/10 transition-all duration-300 ${
                    errors.email
                      ? "border-red-500/70 focus:border-red-500"
                      : "border-white/10 focus:border-accent/50"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-[11px] pl-4 font-medium flex items-center gap-1.5 pt-0.5">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Query / Message */}
              <div className="space-y-2 group">
                <label className="text-[11px] md:text-[10px] uppercase tracking-widest text-neutral-400 pl-4 group-focus-within:text-accent transition-colors">
                  Enter your query <span className="text-accent">*</span>
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="How can I help you?"
                  value={form.query}
                  onChange={(e) => {
                    setForm({ ...form, query: e.target.value });
                    if (errors.query) setErrors({ ...errors, query: undefined });
                  }}
                  className={`w-full bg-white/5 border rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:bg-white/10 transition-all duration-300 resize-none ${
                    errors.query
                      ? "border-red-500/70 focus:border-red-500"
                      : "border-white/10 focus:border-accent/50"
                  }`}
                />
                {errors.query && (
                  <p className="text-red-400 text-[11px] pl-4 font-medium flex items-center gap-1.5 pt-0.5">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>{errors.query}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-accent/10 border border-accent/30 text-accent text-xs md:text-sm font-medium animate-fadeIn">
                <CheckCircle size={18} className="shrink-0 text-accent" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs md:text-sm font-medium animate-fadeIn">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{serverMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={status === "loading"}
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-white py-4 md:py-5 px-6 md:px-8 text-black font-bold uppercase tracking-[0.2em] text-[11px] md:text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-2">
                {status === "idle" && "Send Message"}
                {status === "loading" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Try Again"}
              </span>
              <div className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                {status === "idle" && <Send size={18} />}
                {status === "loading" && <Loader2 size={18} className="animate-spin" />}
                {status === "success" && <CheckCircle size={18} className="text-green-600" />}
                {status === "error" && <Send size={18} />}
              </div>
              {status !== "loading" && (
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
