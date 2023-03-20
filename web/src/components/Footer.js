import './Footer.css';

import { Link } from 'react-router-dom';


export const Footer = () => {

   return (
      <div id="footer">
         <div className="footer-container">
            <div className="footer-container__logo">
               <Link to='/'>
                  <img src="/icons/logo_white.svg" alt="logo icon" />
               </Link>
            </div>
            <div className="footer-container__types">
               <Link to='/recipes/category/breakfast' className='footer-container__types--links'>BREAKFAST</Link>
               <div className='footer-container__types--circles'></div>
               <Link to='/recipes/category/brunch' className='footer-container__types--links'>BRUNCH</Link>
               <div className='footer-container__types--circles'></div>
               <Link to='/recipes/category/lunch' className='footer-container__types--links'>LUNCH</Link>
               <div className='footer-container__types--circles'></div>
               <Link to='/recipes/category/dinner' className='footer-container__types--links'>DINNER</Link>
            </div>
            <div className="footer-container__users">
               <span>Baby's Food Place copyright &reg; 2021</span>
            </div>
         </div>
      </div>
   );

};