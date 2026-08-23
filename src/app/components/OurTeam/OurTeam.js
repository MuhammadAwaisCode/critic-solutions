'use client';

import { useState, useEffect } from 'react';
import styles from './OurTeam.module.css';

const teamMembers = [
  {
    id: 1,
    number: "01",
    sectionTitle: "Message from the CEO",
    name: "Muhammad Haris",
    role: "Founder & Chief Executive Officer",
    image: "/Haris.png",
    quote:
      "We started Critic Solutions with a conviction that businesses deserve a digital partner who thinks like an operator, not a vendor. Every product we ship, every campaign we run, and every line of code we write is judged by one standard — does it move a real number for our client's business.",
    paragraphs: [
      "Under my leadership, Critic Solutions has grown into a full-stack partner trusted by 50+ enterprise clients across six-plus countries, delivering everything from enterprise ERP systems to high-conversion e-commerce platforms. As we expand our footprint from Lahore into global markets, our commitment remains the same: engineering discipline, commercial clarity, and outcomes our clients can measure.",
      "I invite you to explore what we've built, and to let us build the next chapter of your business with you.",
    ],
    sigName: "Muhammad Haris",
    sigRole: "Founder & CEO, Critic Solutions | Chairman, Criticpick Group",
  },
  {
    id: 2,
    number: "02",
    sectionTitle: "Message from the Director",
    name: "Sana Haris",
    role: "Director",
    image: "/Sana.jpeg",
    quote:
      "Great digital products are won or lost in the details — how a checkout feels on a slow connection, how a dashboard reads at a glance, how quickly a support query gets resolved. My focus at Critic Solutions is ensuring that discipline runs through every client relationship, every delivery, and every team we hire.",
    paragraphs: [
      "I oversee operational excellence, client success and quality assurance across our project portfolio, working closely with our engineering, design and marketing teams to make sure the standard we promise on our website is the standard our clients experience in practice.",
      "We measure ourselves by retention, not just by new logos — and a 98% client retention rate is the result of that discipline.",
    ],
    sigName: "Sana Haris",
    sigRole: "Director, Critic Solutions",
  },
  {
    id: 3,
    number: "03",
    sectionTitle: "Message from the Lead Developer",
    name: "Muhammad Awais",
    role: "Web & App Developer",
    image: "/Awais.png",
    quote:
      "Building high-performance web and mobile applications requires clean architecture, scalability, and an obsession with speed. We turn complex technical requirements into smooth, reliable digital experiences.",
    paragraphs: [
      "My focus is on engineering scalable web applications and mobile solutions tailored to enterprise performance standards. Every line of code is structured to ensure security, efficiency, and seamless responsiveness across all platforms.",
      "From modern front-end frameworks to backend integrations, our development approach delivers products that scale effortlessly as your business grows.",
    ],
    sigName: "Muhammad Awais",
    sigRole: "Web & App Developer, Critic Solutions",
  },
  {
    id: 4,
    number: "04",
    sectionTitle: "Message from the Web & App Developer",
    name: "Eysha Moh-i-u-din",
    role: "Web & App Developer",
    image: "/Eysha.png",
    quote:
      "User experience and technical precision go hand in hand. In app and web development, our goal is to build intuitive interfaces backed by rock-solid architecture.",
    paragraphs: [
      "I specialize in crafting cross-platform mobile apps and dynamic web interfaces that elevate how users interact with brands, bridging the gap between design vision and technical execution.",
      "By adopting modern frameworks and agile methodologies, we ensure our digital products are not only visually refined but also built for long-term maintainability.",
    ],
    sigName: "Eysha Moh-i-u-din",
    sigRole: "Web & App Developer, Critic Solutions",
  },
  {
    id: 5,
    number: "05",
    sectionTitle: "Message from the AI Lead",
    name: "AI Specialist",
    role: "Artificial Intelligence & ML Lead",
    image: "/Nigaar.jpeg",
    quote:
      "Transforming complex data and computer vision into intelligent, real-world AI solutions that drive automation and enterprise growth.",
    paragraphs: [
      "Specializing in Machine Learning, Deep Learning, and Computer Vision, I focus on building end-to-end intelligent systems — ranging from predictive analytics pipelines to real-time object detection and facial recognition using YOLOv8 and OpenCV.",
      "By combining modern AI models (TensorFlow, Scikit-learn) with scalable full-stack web architectures (Next.js, Python, SQL), we deliver seamless, data-driven automation tailored to meet high-performance standards.",
    ],
    sigName: "AI Specialist",
    sigRole: "AI & ML Lead, Critic Solutions",
  },
];

export default function OurTeam() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  const current = teamMembers[currentIndex];

  return (
    <div className={styles.sliderContainer}>
      {/* Top Header Section */}
      <div className={styles.headerLine}>
        <span className={styles.sectionNum}>{current.number}</span>
        <h2 className={styles.sectionHeading}>{current.sectionTitle}</h2>
      </div>

      {/* Main Card Wrapper */}
      <div className={styles.wrapper} key={currentIndex}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.imageCard}>
            <img src={current.image} alt={current.name} className={styles.image} />
          </div>
          <div className={styles.leftMeta}>
            <h3 className={styles.leftName}>{current.name}</h3>
            <p className={styles.leftRole}>{current.role}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <blockquote className={styles.quote}>“{current.quote}”</blockquote>

          {current.paragraphs.map((para, i) => (
            <p key={i} className={styles.paragraph}>
              {para}
            </p>
          ))}

          <div className={styles.signatureBlock}>
            <h4 className={styles.sigName}>{current.sigName}</h4>
            <p className={styles.sigRole}>{current.sigRole}</p>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className={styles.controls}>
        <button onClick={prevSlide} className={styles.navBtn} aria-label="Previous">
          &#8592;
        </button>
        <div className={styles.dots}>
          {teamMembers.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className={styles.navBtn} aria-label="Next">
          &#8594;
        </button>
      </div>
    </div>
  );
}