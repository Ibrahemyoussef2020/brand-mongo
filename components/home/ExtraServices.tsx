'use client';

import { dictionaries } from "@/lib/dictionaries"
import { useLang } from "@/context/LangContext"
import Image from "next/image"

const ExtraServices = () => {
  const { translate } = useLang();

  const services = [
    {
      image: '/images/extra-servieces/containers.webp',
      icon: '/images/icons/search.png',
      textKey: dictionaries.extraServices.source
    },
    {
      image: '/images/extra-servieces/colors.webp',
      icon: '/images/icons/inventory.png',
      textKey: dictionaries.extraServices.customize
    },
    {
      image: '/images/extra-servieces/plane.webp',
      icon: '/images/icons/send.png',
      textKey: dictionaries.extraServices.shipping
    },
    {
      image: '/images/extra-servieces/man.webp',
      icon: '/images/icons/security.png',
      textKey: dictionaries.extraServices.monitoring
    }
  ];

  return (
    <section className='extra-services'>
      <h2>{translate(dictionaries.extraServices.heading)}</h2>
      <div className='services'>
        {services.map((service, index) => (
          <article key={index}>
            <div className="cover img-wrapper">
              <Image
                src={service.image}
                alt="global"
                style={{ objectFit: 'fill' }}
                fill
                sizes="100%"
              />
              <div className="icon-container">
                <Image
                  src={service.icon}
                  alt="global"
                  width={24}
                  height={24}
                />
                <h3>{translate(service.textKey)}</h3>
              </div>
            </div>
            <div className="body">
              <p>{translate(service.textKey)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExtraServices
