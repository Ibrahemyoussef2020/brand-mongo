import Image from "next/image"
import Link from "next/link"

const Footer = () => {
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
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="social">
              <a href="#">
                <Image
                  src='/images/icons/footer-facebook.webp'
                  alt="Facebook"
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-twitter.webp'
                  alt="Twitter"
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-linkedin.webp'
                  alt="LinkedIn"
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-insta.webp'
                  alt="Instagram"
                  height={32}
                  width={32}
                />
              </a>
              <a href="#">
                <Image
                  src='/images/icons/footer-youtube.webp'
                  alt="Youtube"
                  height={32}
                  width={32}
                />
              </a>
            </div>
          </div>
          <div className="lists">
            <article>
              <h3>About</h3>
              <ul>
                <li><Link href='#'>About Us</Link></li>
                <li><Link href='#'>Find store</Link></li>
                <li><Link href='#'>Categories</Link></li>
                <li><Link href='#'>About Us</Link></li>
                <li><Link href='#'>Blogs</Link></li>
              </ul>
            </article>
            <article>
              <h3>Partnership</h3>
              <ul>
                <li><Link href='#'>About Us</Link></li>
                <li><Link href='#'>Find store</Link></li>
                <li><Link href='#'>Categories</Link></li>
                <li><Link href='#'>About Us</Link></li>
                <li><Link href='#'>Blogs</Link></li>
              </ul>
            </article>
            <article>
              <h3>Information</h3>
              <ul>
                <li><Link href='#'>Help Center</Link></li>
                <li><Link href='#'>Money Refund</Link></li>
                <li><Link href='#'>Shipping</Link></li>
                <li><Link href='#'>Contact us</Link></li>
              </ul>
            </article>
            <article>
              <h3>Partnership</h3>
              <ul>
                <li><Link href='#'>About Us</Link></li>
                <li><Link href='#'>Find store</Link></li>
                <li><Link href='#'>Categories</Link></li>
                <li><Link href='#'>About Us</Link></li>
                <li><Link href='#'>Blogs</Link></li>
              </ul>
            </article>
            <article className="app">
              <h3>Get app</h3>
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
          <p>© 2023 Ecommerce.</p>
          <div className='not-allowed'>
            <Image
              src="/images/flags/4.webp"
              alt="german"
              height={17}
              width={24} 
            />
            <span>English</span>
            <select>
              <option value="#"></option>
              <option value="english">English</option>
              <option value="frensh">Frensh</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer