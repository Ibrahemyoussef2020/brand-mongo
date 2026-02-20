'use client';

import { useLang } from '@/context/LangContext';
import React, { useState } from 'react'

interface FormData {
  item: string;
  details: string;
  quantity: string;
  unit: string;
}

import { dictionaries } from '@/lib/dictionaries';

const EasyRrquest = () => {
  const [fullWidth, setFullWidth] = useState('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang, translate } = useLang();

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
      newErrors.item = translate(dictionaries.easyRequest.errors.item);
    }
    if (!formData.quantity || formData.quantity === 'how_many') {
      newErrors.quantity = translate(dictionaries.easyRequest.errors.quantity);
    }
    if (!formData.unit || formData.unit === 'how_much') {
      newErrors.unit = translate(dictionaries.easyRequest.errors.unit);
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
      alert(translate(dictionaries.easyRequest.errors.failed));
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
                    {translate(dictionaries.easyRequest.title)}
                </h2>
                <p>
                  {translate(dictionaries.easyRequest.desc)}
                </p>
                <button className='external-btn' onClick={() => showForm('form')}>
                    {translate(dictionaries.easyRequest.sendInquiry)}
                </button>
            </div>

            {/* Form Screen */}
            <div 
              className={`inquiry-form ${fullWidth === 'form' ? 'visible' : ''}`} 
            >
                <h3>{translate(dictionaries.easyRequest.formTitle)}</h3>
                <div className="form__body">
                  <div>
                    <input 
                      className={`block ${errors.item ? 'error' : ''}`}
                      type="text" 
                      name="item"
                      value={formData.item}
                      onChange={handleInputChange}
                      placeholder={translate(dictionaries.easyRequest.itemPlaceholder)}
                    />
                    {errors.item && <span className="error-text">{errors.item}</span>}
                    
                    <textarea 
                      className='block' 
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder={translate(dictionaries.easyRequest.detailsPlaceholder)}
                    />
                  </div>  

                  <div className='selects'>
                    <select 
                      name="quantity" 
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={errors.quantity ? 'error' : ''}
                    >
                      <option value="">{translate(dictionaries.easyRequest.quantity)}</option>
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
                      <option value="">{translate(dictionaries.easyRequest.unitType)}</option>
                      <option value="pcs">{translate(dictionaries.easyRequest.pieces)}</option>
                      <option value="kg">{translate(dictionaries.easyRequest.kilograms)}</option>
                      <option value="ton">{translate(dictionaries.easyRequest.tons)}</option>
                      <option value="box">{translate(dictionaries.easyRequest.boxes)}</option>
                      <option value="set">{translate(dictionaries.easyRequest.sets)}</option>
                      <option value="pair">{translate(dictionaries.easyRequest.pairs)}</option>
                      <option value="liter">{translate(dictionaries.easyRequest.liters)}</option>
                      <option value="meter">{translate(dictionaries.easyRequest.meters)}</option>
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
                    {translate(dictionaries.common.back)}
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
                        {translate(dictionaries.easyRequest.sending)}
                      </>
                    ) : (
                      translate(dictionaries.easyRequest.sendInquiry)
                    )}
                  </button>
                </div>
            </div>

            {/* Success Screen */}
            <div style={{display: 'none !important'}} className={`success-message ${fullWidth === 'success' ? 'visible' : ''}`}>
                <div className="success-icon">✓</div>
                <h3>{translate(dictionaries.easyRequest.successTitle)}</h3>
                <p>
                  {translate(dictionaries.easyRequest.successDesc)}
                </p>
                <button className='external-btn' onClick={resetToIntro}>
                    {translate(dictionaries.easyRequest.sendAnother)}
                </button>
            </div>
        </div>
    </section>
  )
}

export default EasyRrquest
