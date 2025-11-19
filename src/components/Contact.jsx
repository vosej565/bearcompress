import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const Contact = () => {
  const form = useRef();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill out all required fields correctly.',
      });
      return;
    }

    setIsSubmitting(true);

    // Correctly using environment variables for EmailJS credentials
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;




    if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS environment variables are not set!");
        toast({
            variant: "destructive",
            title: "Configuration Error",
            description: "Email sending is not configured. Please contact support.",
        });
        setIsSubmitting(false);
        return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          toast({
            title: 'Message Sent!',
            description: "Thanks for reaching out. We'll get back to you shortly.",
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
          setErrors({});
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem sending your message. Please try again later.',
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg"
    >
      <Helmet>
        <title>Contact Us | BearCompress</title>
        <meta name="description" content="Get in touch with BearCompress for support, feedback, or inquiries. We're here to help you with our image and file compression & conversion tools." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-8">
        Have questions, feedback, or need support? Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form ref={form} onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <Label htmlFor="name" className="text-lg">Your Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} className={`mt-2 p-3 border rounded-md w-full focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-lg">Your Email</Label>
          <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} className={`mt-2 p-3 border rounded-md w-full focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="subject" className="text-lg">Subject</Label>
          <Input id="subject" name="subject" type="text" placeholder="Regarding compression issue" value={formData.subject} onChange={handleChange} className={`mt-2 p-3 border rounded-md w-full focus:ring-2 ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`} />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>
        <div>
          <Label htmlFor="message" className="text-lg">Message</Label>
          <Textarea id="message" name="message" placeholder="Type your message here..." rows="6" value={formData.message} onChange={handleChange} className={`mt-2 p-3 border rounded-md w-full focus:ring-2 resize-y ${errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`} />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
        >
          {isSubmitting ? <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Sending...</> : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  );
};

export default Contact;