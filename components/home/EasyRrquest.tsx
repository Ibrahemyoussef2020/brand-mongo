'use client';

import React, { useState } from 'react'


const EasyRrquest = () => {
  const [fullWidth,setFullWidth] = useState('intro');

  const sendQuery = (e:React.SyntheticEvent,part:string):void=>{
    e.preventDefault();
    setFullWidth(part)
  }

  const showForm = (part:string):void=>{
    setFullWidth(part)
  }
  
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
            <div className={`intro ${fullWidth === 'intro' ? 'visible' : ''}`}>
                <h2>
                    An easy way to send requests to all suppliers
                </h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                </p>
                <button className='external-btn' onClick={_=>showForm('form')}>
                    Send inquiry
                </button>
            </div>

            <form action="#" className={`${fullWidth === 'form' ? 'visible' : ''}`} onSubmit={(e)=>sendQuery(e ,'intro')}>
                <h3>Send quote to suppliers</h3>
                <div className="form__body">
                  <div>
                    <input className='block' type="text" placeholder='What item you need?' />
                    <textarea className='block' name="query" id="home-query" placeholder='Type more details'></textarea>
                  </div>  

                  <div className='selects'>
                    <select name="quntity" id="quntity">
                      <option value="quntity">Quntity</option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                    </select>

                    <select name="pcs" id="pcs">
                      <option value="pcs">Pcs</option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                    </select>  
                  </div>
                </div>  
                <button type='submit'>
                    Send inquiry
                </button>
            </form>
        </div>
    </section>
  )
}

export default EasyRrquest