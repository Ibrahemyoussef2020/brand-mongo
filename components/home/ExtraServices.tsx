'use client'
import { useLang } from "@/context/LangContext"
import Image from "next/image"


const ExtraServices = () => {
  const { lang } = useLang();

  const t = {
    en: {
      heading: "Our extra services",
      source: "Source from Industry Hubs",
      customize: "Customize Your Products",
      shipping: "Fast, reliable shipping by ocean or air",
      monitoring: "Product monitoring and inspection"
    },
    ar: {
      heading: "خدماتنا الإضافية",
      source: "المصدر من مراكز الصناعة",
      customize: "تخصيص منتجاتك",
      shipping: "شحن سريع وموثوق عن طريق البحر أو الجو",
      monitoring: "مراقبة وفحص المنتج"
    }
  };

  const currentT = t[lang] || t.en;

  return (
    <section className='extra-services'>
      <h2>{currentT.heading}</h2>
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
              <p>{currentT.source}</p> 
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
              <p>{currentT.customize}</p>
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
              <p>{currentT.shipping}</p>
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
              <p>{currentT.monitoring}</p>
            </div>
        </article>
      </div>
    </section>
  )
}

export default ExtraServices
