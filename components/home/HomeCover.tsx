import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCover = () => {
  return (
    <section className='cover-wrapper'>
    <div className='lists'>
      <ul>
        <li><Link href={`showResults/mobiles`}>Automobiles</Link></li>
        <li><Link href={`showResults/fashion`}>Clothes and wear</Link></li>
        <li><Link href={`showResults/kitchen-tools`}>Home interiors</Link></li>
        <li><Link href={`showResults/computers`}>Computer and tech</Link></li>
        <li><Link href={`showResults/kitchen-tools`}>Tools, equipments</Link></li>
        <li><Link href={`showResults/sports`}>Sports and outdoor</Link></li>
        <li><Link href={`showResults/pets`}>Animal and pets</Link></li>
        <li><Link href={`showResults/chairs`}>Office furniture</Link></li>
        <li><Link href={`showResults/headphones`}>More category</Link></li>
      </ul>
    </div>

    <div className='cover'>
      <Image
        src='/images/banner.webp'
        fill
        style={{objectFit:'fill'}}
        sizes="100%"
        alt=''
      />
      <div className="text">
        <h2 className='text__heading'>Latest trending</h2>
        <h3 className='text__sub-heading'>Electronic items</h3>
        <Link className='learn' href="#electric">Learn more</Link>
      </div>
    </div>

    <div className='welcome'>
      <div className='intro'>
          <div className="user-wrapper">
            <FontAwesomeIcon icon={faUser}/>
          </div>
          <div className='intro__desc'>
              <p>Hi, user</p>
              <p>let’s get stated</p>
          </div>
          <div className="log">
            <button className='join'>Join now</button>
            <button className='login'>Log in</button>
          </div>
        </div>

        <article className='offer orange'>
          Get US $10 off <br/> with a new <br/>  supplier
        </article>

        <article className='offer green'>
         Send quotes with <br/>  supplier <br/>  preferences
        </article>

      </div>
  </section>
  )
}

export default HomeCover