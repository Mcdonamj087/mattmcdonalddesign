import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {StaticImage} from 'gatsby-plugin-image';
import useDeferAppearance from 'hooks/useDeferAppearance';

import * as styles from './styles.module.css';
import classNames from 'classnames';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const messageWordsRef = useRef<Array<HTMLSpanElement>>([]);

  const [turnt, setTurnt] = useState(false);

  useDeferAppearance(containerRef);

  const changeFaceInterval = useRef<number | undefined>(undefined);

  const startChangeFaces = () => {
    changeFaceInterval.current = setInterval(handleFaceTurn, 5000);
  };

  const stopChangeFaces = () => {
    clearInterval(changeFaceInterval.current);
    startChangeFaces();
  };

  const handleFaceTurn: React.MouseEventHandler<HTMLHeadingElement> = e => {
    if (e?.currentTarget?.dataset.name) {
      setTurnt(e.currentTarget.dataset.name === 'developer' ? true : false);
    } else {
      setTurnt(S => !S);
    }
    stopChangeFaces();
  };

  useEffect(() => {
    const hand = handRef.current!;
    setTimeout(() => {
      hand.classList.add(styles.waving);
      setTimeout(() => {
        hand.classList.remove(styles.waving);
      }, 1000);
    }, 2000);

    startChangeFaces();

    messageWordsRef.current.forEach((word, i) => {
      gsap.fromTo(
        word,
        {
          y: '100%',
        },
        {
          y: 0,
          duration: 1,
          ease: 'expo.out',
          delay: 0.5 + i * 0.2,
        }
      );
      // word.style.transform = 'translateY(0)';
    });
  }, []);

  const messageWords = ['Matt', 'McDonald'];

  return (
    <div
      className={styles.aboutContainer}
      ref={containerRef}
      style={{opacity: 0}}>
      <svg
        className={styles.scrollDownArrow}
        width="48"
        height="22"
        xmlns="http://www.w3.org/2000/svg">
        <g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd">
          <path d="M.5 10.78h45M36.37 1l9.75 9.75-9.75 9.75" />
        </g>
      </svg>
      <div className={styles.hero}>
        <div className={classNames(styles.faces, {[styles.turnt]: turnt})}>
          <div className={styles.boundingCube}>
            <div className={styles.faceImageWrap}>
              <StaticImage
                className={styles.faceImage}
                src="../../assets/images/hero-designface.png"
                alt="Designer"
                objectFit="contain"
                loading="eager"
                placeholder="none"
              />
            </div>
            <div className={styles.faceImageWrap}>
              <StaticImage
                className={styles.faceImage}
                src="../../assets/images/hero-codeface.png"
                alt="Developer"
                objectFit="contain"
                loading="eager"
                placeholder="none"
              />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.handwave} ref={handRef}>
            <StaticImage
              src="../../assets/images/handwave-emoji.png"
              alt="Emoji Handwave"
            />
          </div>
          <div className={styles.messageWrap}>
            <h1 className={styles.messageTitle}>
              {messageWords.map((word, i) => (
                <span ref={el => (messageWordsRef.current[i] = el!)}>
                  {i < messageWords.length - 1 ? (
                    <>
                      {word}
                      <>&nbsp;</>
                    </>
                  ) : (
                    <>{word}</>
                  )}
                </span>
              ))}
            </h1>
          </div>

          <div className={styles.tradeWrap}>
            <h2
              className={!turnt ? styles.active : undefined}
              onClick={handleFaceTurn}
              data-name="designer"
              data-mouse-interact>
              Designer
            </h2>
            <span></span>
            <h2
              className={turnt ? styles.active : undefined}
              onClick={handleFaceTurn}
              data-name="developer"
              data-mouse-interact>
              Developer
            </h2>
          </div>

          <p>
            Hey there! I’m a multidisciplinary designer, illustrator, and
            code-nerd based in Austin, TX, with a mission to design beautiful
            experiences for the web and bring them to life with my favorite
            front-end dev tools.
          </p>
        </div>
      </div>

      <div>
        <h2>Want more?</h2>
        <p>
          Pardon me while I finish my site! In the meantime, check out{' '}
          <a
            className="slide"
            href="/Matt_McDonald_Resume.pdf"
            title="my resume"
            target="_blank">
            my resume
          </a>{' '}
          for more info. You can also find my work scattered across some of
          these fine platforms ✌️
        </p>
        <div className={styles.socialBlocks}>
          <div className={styles.socialBlockWrapper} data-mouse-interact>
            <a
              href="https://www.behance.net/MattMcDonaldDesign"
              className={styles.block}
              title="behance"
              target="_blank"
              rel="noreferrer">
              <StaticImage
                className={styles.socialBlockImg}
                src="../../assets/svg/behance.svg"
                alt="Behance"
              />
            </a>
          </div>
          <div className={styles.socialBlockWrapper} data-mouse-interact>
            <a
              href="https://dribbble.com/mcdonamj087"
              className={styles.block}
              title="dribbble"
              target="_blank"
              rel="noreferrer">
              <StaticImage
                className={styles.socialBlockImg}
                src="../../assets/svg/dribbble.svg"
                alt="Dribbble"
              />
            </a>
          </div>
          <div className={styles.socialBlockWrapper} data-mouse-interact>
            <a
              href="https://www.linkedin.com/in/matt-mcdonald-37389b91/"
              className={styles.block}
              title="linkedin"
              target="_blank"
              rel="noreferrer">
              <StaticImage
                className={styles.socialBlockImg}
                src="../../assets/svg/linkedin.svg"
                alt="Linkedin"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
