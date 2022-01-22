import React from 'react';
import AppExplained from './AppExplained';
import AppRealization from './AppRealization';

const Footer = ({ footerClass }) => {
  return (
        <footer className={footerClass}>
            <div className='footer-container'>
                <div className='real-howto'>
                    <AppExplained />
                    <AppRealization />
                </div>
                <div className='footer-external-links'>
                    <a href = "https://github.com/Louack" target="_blank" rel='noreferrer'>
                        <img src='/img/github-icon.png' alt='github-icon' />
                    </a>
                    <a href = "https://www.linkedin.com/in/loïc-briset-366a0a220" target="_blank" rel='noreferrer'>
                        <img src='/img/linkedin-icon.png' alt='linkedin-icon-icon' />
                    </a>
                </div>
            </div>
        </footer>
  )
};

export default Footer;
