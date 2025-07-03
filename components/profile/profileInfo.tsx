import { faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileInfo = () => {
  return (
    <div className='profile-info'>
        <div className='left'>
            <Image
                src='/images/ibrahim.webp'
                alt='prfile image'
                width={250}
                height={350}
            />
        </div>
        <div className='center'>
            <div className='informations'>
                <div className='info'>
                    <h3>Name</h3>
                    <p>Ibrahim Youseef</p>
                </div>
                <div className='info'>
                    <h3>Age</h3>
                    <p>28 Yrs</p>
                </div>
                <div className='info'>
                    <h3>Tilte</h3>
                    <p>Egypt, Cairo</p>
                </div>
                <div className='info'>
                    <h3>Subscription data</h3>
                    <p>December , 10 2012</p>
                </div>
                <div className='info'>
                    <h3>Purchase volume</h3>
                    <p>$.00.7000</p>
                </div>
                <div className='info'>
                    <h3>Purchase Qty</h3>
                    <p>300</p>
                </div>
            </div>
            <div className='desc'>
                Hi there, I'M Ibrahim Youssef ,
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, placeat distinctio? Necessitatibus, incidunt placeat esse vel accusantium dolor libero voluptates, explicabo eveniet, culpa aut voluptate quod.
            </div>
            <Link href='/' className='btn'>Back to home</Link>
        </div>
        <div className='right'>
            <div className='contact-info'>
                <div className='informations'>
                    <div className='info concate'>
                        <h3>Phone</h3>
                        <p><a href="tel:01147359396">01147359396</a></p>
                    </div>
                    <div className='info concate'>
                        <h3>Email</h3>
                        <p><a href="mailto:ibrahimYoussef95.12@gmail">ibrahimYoussef95.12</a></p>
                    </div>
                    <div className='info'>
                        <h3>Tilte</h3>
                        <p>Egypt, Cairo</p>
                    </div>
                    <div className='info concate'>
                        <h3>WhatsUp</h3>
                        <p><a href="wa.me/01147359396">01147359396</a></p>
                    </div>
                </div>
            </div>

            <div className='form-wrapper'>
                <h2>Send to Ibrahim</h2>
                <form>
                    <input type="text" className='title' placeholder='Subject Tiitle' />
                    <textarea name="send-to-ibrahim" id="send-to-ibrahim" placeholder='write to Ibrahime'></textarea>
                    <button className='btn'>Send Message</button>
                </form>
            </div>
        </div>   
    </div>
  )
}

export default ProfileInfo