import styles from './Footer.module.css';
import { BsWhatsapp, BsLinkedin, BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

const MORE_SERVICES = [
  'Brand Identity Design', 'SEO & Content Strategy', 'Social Media Management',
  'Cloud Infrastructure', 'DevOps & CI/CD', 'Mobile App Development',
  'Email Marketing Automation', 'Analytics & BI Dashboards',
];

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Custom Web Development', href: '#services' },
      { label: 'E-Commerce Solutions',   href: '#services' },
      { label: 'Web App Development',    href: '#services' },
      { label: 'UI/UX Design',           href: '#services' },
      { label: 'API Integration',        href: '#services' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Criticpick ERP Suite',    href: '#ai-features' },
      { label: 'Lead Gen Engine',  href: '#pricing' },
      { label: 'Automation Suite', href: '#pricing' },
      { label: 'Business OS',      href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Criticpick',    href: '#overview' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Careers',      href: '#' },
      { label: 'Blog',         href: '#' },
      { label: 'Contact Us',   href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '#' },
      { label: 'Terms of Service',  href: '#' },
      { label: 'Cookie Policy',     href: '#' },
    ],
  },
];

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
  return (
    <footer id="footer">

      <div className={styles.moreServices}>
        <div className="container">
          <p className="label" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Explore More Services</p>
          <div className={styles.capsuleGrid}>
            {MORE_SERVICES.map((s) => (
              <a key={s} href="#pricing" className={styles.capsule}>{s}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.main} section--dark`}>
        <div className="container">
          <div className={styles.top}>

            <div className={styles.brand}>
              <div className={styles.logo}>
                <span className={styles.logoMark}>
                  <img
                    src="/logo.png"
                    alt="Criticpick Logo"
                    className={styles.logoImg}
                  />
                </span>
                <span>Critics Solutions</span>
              </div>
              <p className={styles.brandDesc}>{t?.tagline || ""}</p>
              
              <div className={styles.contact}>
                <a href="mailto:criticpickindustries@gmail.com" className={styles.contactLink}>criticpickindustries@gmail.com</a>
                <a href="https://wa.me/923019465427"><span className={styles.contactLink}>+923019465427</span></a>
                <a href="https://wa.me/923496257662"><span className={styles.contactLink}>+923496257662</span></a>
                <a href="https://wa.me/1(559)571-2010"><span className={styles.contactLink}>+1 (559) 571-2010</span></a>
                <span className={styles.contactLink}>Lahore, Punjab, Pakistan</span>
              </div>

              <div className={styles.socials} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {SOCIALS.map((s) => {
                  const IconComponent = s.Icon;
                  
                  // Guard clause in case an icon component fails to import properly
                  if (!IconComponent) return null;

                  return (
                    <a 
                      key={s.label} 
                      href={s.href} 
                      className={styles.socialLink}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* FIXED: Explicit layout wrapper forces the icon to render with structural integrity */}
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconComponent size={16} />
                      </span>
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className={styles.columns}>
              {COLUMNS.map((col) => (
                <div key={col.title} className="stack stack--sm">
                  <p className={styles.colTitle}>{col.title}</p>
                  {col.links.map((l) => (
                    <a key={l.label} href={l.href} className={styles.colLink}>{l.label}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bottom}>
            {/* FIXED: Optional chaining protection */}
            <p className={styles.copy}>© {new Date().getFullYear()} Critics Solutions. {t?.rights || ""}</p>
            <p className={styles.copy}>Engineered in Lahore. Delivered worldwide.</p>
          </div>
        </div>
      </div>

    </footer>
  );
}