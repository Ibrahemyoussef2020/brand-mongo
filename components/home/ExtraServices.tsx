import Image from "next/image"


const ExtraServices = () => {
  return (
    <section className='extra-services'>
      <h2>Our extra services</h2>
      <div className='services'>
        <article>
            <div className="cover img-wrapper">
              <Image
                src='/images/extra-servieces/containers.webp'
                alt="global"
                style={{objectFit:'fill'}}
                fill
                sizes="100%"
              />
              <div className="icon-container">
                <Image
                  src='/images/icons/search.png'
                  alt="global"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="body">
              <p>Source from <br/> Industry Hubs</p>
            </div>
        </article>
        <article>
            <div className="cover img-wrapper">
              <Image
                src='/images/extra-servieces/colors.webp'
                alt="global"
                style={{objectFit:'fill'}}
                fill
                sizes="100%"
              />
              <div className="icon-container">
                <Image
                  src='/images/icons/inventory.png'
                  alt="global"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="body">
              <p>Customize Your <br/>  Products</p>
            </div>
        </article>
        <article>
            <div className="cover img-wrapper">
              <Image
                src='/images/extra-servieces/plane.webp'
                alt="global"
                style={{objectFit:'fill'}}
                fill
                sizes="100%"
              />
              <div className="icon-container">
                <Image
                  src='/images/icons/send.png'
                  alt="global"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="body">
              <p>Fast, reliable shipping <br/> by ocean or air</p>
            </div>
        </article>
        <article>
            <div className="cover img-wrapper">
              <Image
                src='/images/extra-servieces/man.webp'
                alt="global"
                style={{objectFit:'fill'}}
                fill
                sizes="100%"
              />
              <div className="icon-container">
                <Image
                  src='/images/icons/security.png'
                  alt="global"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="body">
              <p>Product monitoring <br/> and inspection</p>
            </div>
        </article>
      </div>
    </section>
  )
}

export default ExtraServices