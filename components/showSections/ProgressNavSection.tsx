
import Image from 'next/image'
import Link from 'next/link'

interface props{
    page:string,
    section:string, 
    item:string
}

const ProgressNavSection = ({page='home',section='',item=''}:props) => {
      
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
                <Link href={`/showSections/${section}`}>{section}</Link>
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
                <Link href={`/showSections/${section}`}>{section}</Link>
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
                <Link href={`/itemDetails/${section}/${item}`}>{item}</Link>
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

export default ProgressNavSection
