'use client';

import Image from "next/image"
import Link from "next/link"
import { useLang } from "@/context/LangContext"
import { dictionaries } from "@/lib/dictionaries"

const Footer = () => {
  const { translate, lang ,setLang } = useLang();

  return (
    <footer>
      <div className="website-info">
        <div className="container">
          <div className="intro">
            <Image
              src='/images/pc-logo.webp'
              alt="Brand"
              height={48}
              width={150}
            />
            <p>
              {translate(dictionaries.footer.intro)}
            </p>
            <div className="social">
              <a href="#">
                <Image
                  src='/images/icons/footer-facebook.webp'
                  alt={translate(dictionaries.footer.social.facebook)}
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-twitter.webp'
                  alt={translate(dictionaries.footer.social.twitter)}
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-linkedin.webp'
                  alt={translate(dictionaries.footer.social.linkedin)}
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-insta.webp'
                  alt={translate(dictionaries.footer.social.instagram)}
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-youtube.webp'
                  alt={translate(dictionaries.footer.social.youtube)}
                  height={32}
                  width={32}
                />
              </a>
            </div>
          </div>
          <div className="lists">
            <article>
              <h3>{translate(dictionaries.footer.about.title)}</h3>
              <ul>
                <li><Link href='#'>{translate(dictionaries.footer.about.aboutUs)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.findStore)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.categories)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.aboutUs)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.blogs)}</Link></li>
              </ul>
            </article>
            <article>
              <h3>{translate(dictionaries.footer.partnership.title)}</h3>
              <ul>
                <li><Link href='#'>{translate(dictionaries.footer.about.aboutUs)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.findStore)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.categories)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.aboutUs)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.blogs)}</Link></li>
              </ul>
            </article>
            <article>
              <h3>{translate(dictionaries.footer.information.title)}</h3>
              <ul>
                <li><Link href='#'>{translate(dictionaries.footer.information.helpCenter)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.information.moneyRefund)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.information.shipping)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.information.contactUs)}</Link></li>
              </ul>
            </article>
            <article>
              <h3>{translate(dictionaries.footer.partnership.title)}</h3>
              <ul>
                <li><Link href='#'>{translate(dictionaries.footer.about.aboutUs)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.findStore)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.categories)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.aboutUs)}</Link></li>
                <li><Link href='#'>{translate(dictionaries.footer.about.blogs)}</Link></li>
              </ul>
            </article>
            <article className="app">
              <h3>{translate(dictionaries.footer.getApp)}</h3>
              <div>
                <a href="#">
                  <Image
                    src='/images/app-store .webp'
                    alt="appStore"
                    height={42}
                    width={124}
                  />
                </a>
                <a href="#">
                  <Image
                    src='/images/google-play.webp'
                    alt="googlePlay"
                    height={42}
                    width={124}
                  />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container"> 
          <p>{translate(dictionaries.footer.copyright)}</p>
          <div className='not-allowed'>
            <Image
              src={`/images/flags/${lang === 'en' ? 4 : 10}.webp`}
              alt={translate(lang === 'en' ? dictionaries.languages.english : dictionaries.languages.arabic)}
              height={17}
              width={24} 
            />
            <span>{translate(lang === 'en' ? dictionaries.languages.english : dictionaries.languages.arabic)}</span>
            <select value={lang} onChange={(e) => setLang(e.target.value as 'en' | 'ar')}>
              <option value="en">{translate(dictionaries.languages.english)}</option>
              <option value="ar">{translate(dictionaries.languages.arabic)}</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
