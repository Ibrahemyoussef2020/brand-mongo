'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import MenuSidebar from '@/components/layout/menu-sidebar';
import Footer from '@/components/layout/Footer';
import axios from 'axios';

const MessagePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await axios.post('/api/send-email', formData);
      if (response.status === 200) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <>
      <Header page="message" heading="Contact Us" />
      <MenuSidebar />
      <div className="message-page container">
        <div className="form-container">
          <h1>Send us a message</h1>
          <p className="desc">
            Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible.
          </p>

          {status.success && (
            <div className="status-msg success">
              Your message has been sent successfully!
            </div>
          )}

          {status.error && (
            <div className="status-msg error">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group subject-field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="submit-btn"
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MessagePage;
