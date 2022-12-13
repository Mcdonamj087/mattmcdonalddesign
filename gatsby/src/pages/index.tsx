import React, {useEffect, useRef, useState} from 'react';
import {graphql} from 'gatsby';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {PageProps} from 'gatsby';
import gsap from 'gsap';
import {isMobile} from 'helpers';

import * as styles from './home.module.css';
import useDeferAppearance from 'hooks/useDeferAppearance';

const Homepage: React.FC<PageProps<Queries.ProjectsQuery>> = ({data}) => {
  const projects = data.allSanityProjects.nodes;

  const containerRef = useRef<HTMLDivElement>(null);
  const diagonalWrapRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HTMLDivElement>(null);

  useDeferAppearance(containerRef);

  const [activeProject, setActiveProject] = useState(0);
  const [slidePos, setSlidePos] = useState(0);

  const maxTransform = 25;
  const maxRotate = 10;
  const duration = 0.6;
  const easeFunction = 'Power3.easeOut';

  const handleMouseMove = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const bcr = target.getBoundingClientRect();
    const xPos = bcr.x;
    const yPos = bcr.y;
    const w = bcr.width;
    const h = bcr.height;
    // Get mouse position relative to window
    const mouseWindowY = e.clientY;
    const mouseWindowX = e.clientX;
    // Get mouse position relative to the diagonal wrap - center point being zero
    const mouseX = Math.floor(mouseWindowX - xPos - w / 2);
    const mouseY = Math.floor(mouseWindowY - yPos - h / 2);
    // Get mouse position on project card
    const mousePercentageX = Math.round(1000 * (mouseX / (w / 2))) / 1000;
    const mousePercentageY = Math.round(1000 * (mouseY / (h / 2))) / 1000;

    gsap.to(controllerRef.current, {
      y: maxTransform * -mousePercentageY,
      x: maxTransform * -mousePercentageX,
      rotationY: maxRotate * -mousePercentageY,
      rotationX: maxRotate * -mousePercentageX,
      ease: easeFunction,
      duration,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(controllerRef.current, {
      y: 0,
      x: 0,
      rotationY: 0,
      rotationX: 0,
      ease: easeFunction,
      duration,
    });
  };

  const decrementActiveProject = () =>
    setActiveProject(S => (S > 0 ? S - 1 : 0));

  const incrementActiveProject = () =>
    setActiveProject(S =>
      S < projects.length - 1 ? S + 1 : projects.length - 1
    );

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      incrementActiveProject();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      decrementActiveProject();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      const navigateTo = projects[activeProject].url!;
      window.open(navigateTo, '_blank');
    }
  };

  useEffect(() => {
    const diagonalWrap = diagonalWrapRef.current;
    setTimeout(() => {
      diagonalWrap?.classList.add(styles.loaded);
    }, 1);
    console.log(diagonalWrap);

    if (!isMobile()) {
      diagonalWrap?.addEventListener('mousemove', handleMouseMove);
      diagonalWrap?.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      diagonalWrap?.removeEventListener('mousemove', handleMouseMove);
      diagonalWrap?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  useEffect(() => {
    setSlidePos((activeProject / projects.length) * 100);
  }, [activeProject]);

  return (
    <div className={styles.homeWrapper} ref={containerRef} style={{opacity: 0}}>
      <div className={styles.projectNavigation}>
        <button
          className={activeProject === 0 ? styles.disabled : undefined}
          onClick={decrementActiveProject}>
          <svg
            className={styles.prev}
            width="48"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            data-mouse-interact>
            <g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd">
              <path d="M.5 10.78h45M36.37 1l9.75 9.75-9.75 9.75" />
            </g>
          </svg>
        </button>
        <button
          className={
            activeProject === projects.length - 1 ? styles.disabled : undefined
          }
          onClick={incrementActiveProject}>
          <svg
            className={styles.next}
            width="48"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            data-mouse-interact>
            <g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd">
              <path d="M.5 10.78h45M36.37 1l9.75 9.75-9.75 9.75" />
            </g>
          </svg>
        </button>
      </div>

      <div className={styles.diagonalWrap} ref={diagonalWrapRef}>
        <div className={styles.dimensionController} ref={controllerRef}>
          <div className={styles.paddingSquare}>
            <div className={styles.inner}>
              <div
                className={styles.allProjectsWrap}
                style={{
                  width: `${projects.length * 100}%`,
                  transform: `translateX(-${slidePos}%)`,
                }}>
                {projects.map((project, i) => {
                  const image = getImage(project.featuredImage!.asset);
                  return (
                    <a
                      key={project.id}
                      href={project.url!}
                      className={classNames(styles.project, {
                        [styles.active]: activeProject === i,
                      })}
                      style={{width: `calc(100% / ${projects.length})`}}
                      onClick={e => {
                        if (i !== activeProject) {
                          e.preventDefault();
                        }
                        setActiveProject(i);
                      }}
                      target="_blank">
                      <div>
                        <GatsbyImage image={image!} alt={project.title!} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className={styles.projectTitlesWrap}
            style={{transform: `translateX(-${slidePos}%)`}}>
            <>
              {projects.map((project, i) => (
                <div key={project.id}>
                  <h1
                    className={activeProject === i ? styles.active : undefined}>
                    {project.title}
                  </h1>
                </div>
              ))}
              <div></div>
            </>
          </div>

          <div
            className={styles.projectDetailsWrap}
            style={{transform: `translateX(-${slidePos}%)`}}>
            {projects.map(({id, mediums}, i) => (
              <div key={id}>
                <h5 className={activeProject === i ? styles.active : undefined}>
                  {mediums?.map((medium, idx) => (
                    <React.Fragment key={`${medium}_${i}`}>
                      {medium} {idx < mediums.length && <br />}
                    </React.Fragment>
                  ))}
                </h5>
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query Projects {
    allSanityProjects {
      nodes {
        id
        title
        url
        featuredImage {
          asset {
            gatsbyImageData
          }
        }
        mediums
      }
    }
  }
`;

export default Homepage;
