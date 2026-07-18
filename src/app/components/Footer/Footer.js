'use client';
import Link from 'next/link'; // Next.js fast routing ke liye
import { usePathname } from 'next/navigation'; // Current page track karne ke liye
import styles from './Footer.module.css';
import { BsWhatsapp, BsLinkedin, BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

// Only hrefs live here — the visible labels/titles come from t.footer at
// render time. Each hrefs array must stay in the same order as the
// corresponding `links` array inside t.footer.columns[key] in LangContext.js.
const COLUMN_HREFS = {
  services: ['#services', '#services', '#services', '#services', '#services'],
  products: ['#ai-features', '#pricing', '#pricing', '#pricing'],
  company: ['#overview', '#case-studies', '#', '#', '/contact'],
  legal: ['/privacy-policy', '/terms-of-service', '/cookie-policy'],
};

// Visual left-to-right order of the footer columns.
const COLUMN_ORDER = ['services', 'products', 'company', 'legal'];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/critic-pick-88a074284?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    Icon: BsLinkedin
  },
  {
    label: 'Whatsapp',
    href: 'https://wa.me/+15595712010',
    Icon: BsWhatsapp
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1D4c3j9QcW/',
    Icon: BsFacebook
  },
  {
    label: 'Twitter',
    href: 'https://x.com/criticpickmarkt',
    Icon: BsTwitterX
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/critic_solutions?igsh=a2NleTA0YTI0MjFp',
    Icon: BsInstagram
  },
];

export default function Footer({ t }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const tags = t?.tags || [];
  const columns = t?.columns || {};

  // Smart routing function for hash links
  const getHref = (href) => {
    if (href.startsWith('#')) {
      return isHomePage ? href : `/${href}`; // Sub-page se home page ke sections par navigation handle karega
    }
    return href; // Contact aur Legal pages ke liye same rahega
  };

  return (
    <footer id="footer">

      <div className={styles.moreServices}>
        <div className="container">
          <p className={`${styles.exploreLabel} label`}>{t?.exploreServices}</p>
          <div className={styles.capsuleGrid}>
            {tags.map((tag) => (
              <Link key={tag} href={getHref('#pricing')} className={styles.capsule}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.main} section--dark`}>
        <div className="container">
          <div className={styles.top}>

            <div className={styles.brand}>
              <Link href={isHomePage ? '#' : '/'} className={styles.logo}>
                <span className={styles.logoMark}>
                  <img
                    src="/logo.png"
                    alt="Criticpick Logo"
                    className={styles.logoImg}
                  />
                </span>
                <span>Critics Solutions</span>
              </Link>
              <p className={styles.brandDesc}>{t?.tagline || ""}</p>

              <div className={styles.contact}>
                <a href="mailto:criticpickindustries@gmail.com" className={styles.contactLink}>criticpickindustries@gmail.com</a>
                <a href="https://wa.me/923019465427" className={styles.contactLink}><span>+923019465427</span></a>
                <a href="https://wa.me/923496257662" className={styles.contactLink}><span>+923496257662</span></a>
                <a href="https://wa.me/1(559)571-2010" className={styles.contactLink}><span>+1 (559) 571-2010</span></a>
                <span className={styles.contactLink}>Lahore, Punjab, Pakistan</span>
              </div>

              <div className={styles.socials}>
                {SOCIALS.map((s) => {
                  const IconComponent = s.Icon;

                  if (!IconComponent) return null;

                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.socialIconWrapper}>
                        <IconComponent size={16} />
                      </span>
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className={styles.columns}>
              {COLUMN_ORDER.map((key) => {
                const col = columns[key];
                if (!col) return null;
                const hrefs = COLUMN_HREFS[key] || [];
                return (
                  <div key={key} className="stack stack--sm">
                    <p className={styles.colTitle}>{col.title}</p>
                    {(col.links || []).map((label, i) => (
                      <Link key={label} href={getHref(hrefs[i] || '#')} className={styles.colLink}>
                        {label}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copy}>© {new Date().getFullYear()} Critics Solutions. {t?.rights || ""}</p>
            <p className={styles.copy}>{t?.bottomLeft || ""}</p>
          </div>
        </div>
      </div>

    </footer>
  );
}