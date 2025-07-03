

import Image from 'next/image'
import Link from 'next/link'

interface props{
    page:string,
    category:string,
    item:string
}

const ProgressNav = ({page='home',category='',item=''}:props) => {
      
    if (page === 'home') {
      return  <section className='progress-nav'>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                    <span>
                        <Image
                            height={15}
                            width={15}
                            src='/images/road-arrow.png'
                            alt=''
                        />    
                    </span>
                </li>
            </ul>
    </section>
    }

    if (page === 'results') {   
      return  <section className='progress-nav'>
        <ul>
            <li>
                <Link href='/'>Home</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
            <li>
                <Link href={`/showResults/${category}`}>{category}</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'details') {
       return <section className='progress-nav'>
        <ul>
            <li>
                <Link href='/'>Home</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
            <li>
                <Link href={`/showResults/${category}`}>{category}</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
            <li>
                <Link href={`/itemDetails/${category}/${item}`}>{item}</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'cart') {
        return  <section className='progress-nav'>
        <ul>
            <li>
                <Link href='/'>Home</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
            <li>
                <Link href={`/cart`}>Cart</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'profile') {
        return  <section className='progress-nav'>
        <ul>
            <li>
                <Link href='/'>Home</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
            <li>
                <Link href={`/profile`}>Profile</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'orders') {
        return  <section className='progress-nav'>
        <ul>
            <li>
                <Link href='/'>Home</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
            <li>
                <Link href={`/orders`}>Orders</Link>
                <span>
                    <Image
                        height={15}
                        width={15}
                        src='/images/road-arrow.png'
                        alt=''
                    />    
                </span>
            </li>
        </ul>
    </section>
    }
    else{
        return <div></div>
    }
}

export default ProgressNav