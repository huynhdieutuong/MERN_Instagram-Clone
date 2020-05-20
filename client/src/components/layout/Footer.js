import React from 'react';

const Footer = (props) => {
  return (
    <footer className='footer'>
      <div className='footer__column'>
        <nav className='footer__nav'>
          <ul className='footer__list'>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                ABOUT
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                HELP
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                PRESS
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                API
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                JOB
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                SPRIVACY
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                TERMS
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                LOCATION
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                STOP ACCOUNTS
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                HASHTAGS
              </a>
            </li>
            <li className='footer__list-item'>
              <a href='#!' className='footer__link'>
                LANGUAGE
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='footer__column'>
        <span className='footer__copyright'>
          © 2020 INSTAGRAM FROM FACEBOOK
        </span>
      </div>
    </footer>
  );
};

export default Footer;
