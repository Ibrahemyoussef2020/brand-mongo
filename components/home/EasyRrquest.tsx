'use client';

import { useLang } from '@/context/LangContext';
import React, { useState } from 'react'

interface FormData {
  item: string;
  details: string;
  quantity: string;
  unit: string;
}

const EasyRrquest = () => {
  const [fullWidth, setFullWidth] = useState('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang } = useLang();

  const [formData, setFormData] = useState<FormData>({
    item: '',
    details: '',
    quantity: '',
    unit: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.item.trim()) {
      newErrors.item = lang === 'ar' ? 'يرجى إدخال العنصر الذي تحتاجه' : 'Please enter what item you need';
    }
    if (!formData.quantity || formData.quantity === 'how_many') {
      newErrors.quantity = lang === 'ar' ? 'يرجى اختيار الكمية' : 'Please select quantity';
    }
    if (!formData.unit || formData.unit === 'how_much') {
      newErrors.unit = lang === 'ar' ? 'يرجى اختيار الوحدة' : 'Please select unit';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const sendQuery = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, you would send to API:
      // await axios.post('/api/inquiries', formData);
      
      console.log('Quote request sent:', formData);
      
      // Show success state
      setFullWidth('success');
      
      // Reset form
      setFormData({ item: '', details: '', quantity: '', unit: '' });
      
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert(lang === 'ar' ? 'فشل إرسال الاستفسار. يرجى المحاولة مرة أخرى.' : 'Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showForm = (part: string): void => {
    setFullWidth(part);
    setErrors({});
  };

  const resetToIntro = (): void => {
    setFullWidth('intro');
    setErrors({});
  };
  
  return (
    <section className='easy-req' id='request'>
        <picture>
            <source media="(min-width:570px)" srcSet="/images/easy-req-pc.webp" />
             <img 
             src="/images/easy-req-mob.webp" 
             alt="" 
             />   
        </picture>

        <div className='query'>
            {/* Intro Screen */}
            <div className={`intro ${fullWidth === 'intro' ? 'visible' : ''}`}>
                <h2>
                    {lang === 'ar' ? 'طريقة سهلة لإرسال الطلبات لجميع الموردين' : 'An easy way to send requests to all suppliers'}
                </h2>
                <p>
                  {lang === 'ar' ? 'احصل على عروض أسعار من عدة موردين معتمدين لاحتياجات عملك. وفر الوقت وجد أفضل الصفقات باستفسار واحد فقط.' : 'Get quotes from multiple verified suppliers for your business needs. Save time and find the best deals with just one inquiry.'}
                </p>
                <button className='external-btn' onClick={() => showForm('form')}>
                    {lang === 'ar' ? 'إرسال استفسار' : 'Send inquiry'}
                </button>
            </div>

            {/* Form Screen */}
            <div 
              className={`inquiry-form ${fullWidth === 'form' ? 'visible' : ''}`} 
            >
                <h3>{lang === 'ar' ? 'إرسال عرض سعر للموردين' : 'Send quote to suppliers'}</h3>
                <div className="form__body">
                  <div>
                    <input 
                      className={`block ${errors.item ? 'error' : ''}`}
                      type="text" 
                      name="item"
                      value={formData.item}
                      onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'ما هو العنصر الذي تحتاجه؟ مثال: هاتف محمول' : 'What item you need? For example: mobile phone'}
                    />
                    {errors.item && <span className="error-text">{errors.item}</span>}
                    
                    <textarea 
                      className='block' 
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'اكتب المزيد من التفاصيل. مثال: اللون، الحجم، المادة، إلخ.' : 'Type more details. For example: color, size, material, etc.'}
                    />
                  </div>  

                  <div className='selects'>
                    <select 
                      name="quantity" 
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={errors.quantity ? 'error' : ''}
                    >
                      <option value="">{lang === 'ar' ? 'الكمية' : 'How many'}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="500">500+</option>
                    </select>

                    <select 
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className={errors.unit ? 'error' : ''}
                    >
                      <option value="">{lang === 'ar' ? 'نوع الوحدة' : 'Unit type'}</option>
                      <option value="pcs">{lang === 'ar' ? 'قطعة' : 'Pieces'}</option>
                      <option value="kg">{lang === 'ar' ? 'كيلوجرام' : 'Kilograms'}</option>
                      <option value="ton">{lang === 'ar' ? 'طن' : 'Tons'}</option>
                      <option value="box">{lang === 'ar' ? 'صندوق' : 'Boxes'}</option>
                      <option value="set">{lang === 'ar' ? 'مجموعة' : 'Sets'}</option>
                      <option value="pair">{lang === 'ar' ? 'زوج' : 'Pairs'}</option>
                      <option value="liter">{lang === 'ar' ? 'لتر' : 'Liters'}</option>
                      <option value="meter">{lang === 'ar' ? 'متر' : 'Meters'}</option>
                    </select>
                  </div>
                </div>  
                
                <div className="form-actions">
                  <button 
                    type='button' 
                    className='back-btn'
                    onClick={resetToIntro}
                    disabled={isSubmitting}
                  >
                    {lang === 'ar' ? '← رجوع' : '← Back'}
                  </button>
                  <button 
                    type='button'
                    disabled={isSubmitting}
                    className={isSubmitting ? 'loading' : ''}
                    onClick={sendQuery}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        {lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}
                      </>
                    ) : (
                      lang === 'ar' ? 'إرسال استفسار' : 'Send inquiry'
                    )}
                  </button>
                </div>
            </div>

            {/* Success Screen */}
            <div style={{display: 'none !important'}} className={`success-message ${fullWidth === 'success' ? 'visible' : ''}`}>
                <div className="success-icon">✓</div>
                <h3>{lang === 'ar' ? 'تم إرسال الاستفسار بنجاح!' : 'Inquiry Sent Successfully!'}</h3>
                <p>
                  {lang === 'ar' ? 'تم إرسال طلبك إلى شبكتنا من الموردين المعتمدين. ستتلقى عروض الأسعار خلال 24-48 ساعة.' : "Your request has been sent to our network of verified suppliers. You'll receive quotes within 24-48 hours."}
                </p>
                <button className='external-btn' onClick={resetToIntro}>
                    {lang === 'ar' ? 'إرسال استفسار آخر' : 'Send another inquiry'}
                </button>
            </div>
        </div>
    </section>
  )
}

export default EasyRrquest
