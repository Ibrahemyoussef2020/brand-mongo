import Image from 'next/image'
import React from 'react'

const Suppliers = () => {
  return (
    <section className='suppliers'>
        <h2>Suppliers by region</h2>
        <div className='contries'>
            <article>
                <Image
                    src='/images/flags/1.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>Denmark</h3>
                    <p>denmark.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/2.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>Australia</h3>
                    <p>Australia.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/3.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>France</h3>
                    <p>France.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/4.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>United States</h3>
                    <p>States.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/5.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>Russia</h3>
                    <p>Russia.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/6.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>China</h3>
                    <p>China.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/7.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>Italy</h3>
                    <p>Italy.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/8.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>Great Britain</h3>
                    <p>Britain.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/german.png'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>German</h3>
                    <p>German.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/7.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>Italy Alies</h3>
                    <p>Italy-a.com.dk</p>
                </div>
            </article>
        </div>
    </section>
  )
}

export default Suppliers