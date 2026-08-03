import {
FaFacebook,
FaInstagram,
FaLinkedin,
FaGithub
} from "react-icons/fa";

import "./Footer.css";

function Footer(){

return(

<footer className="footer">

<div className="footer-container">

<div>

<h2>ShopEase</h2>

<p>

Your trusted online shopping destination.

</p>

</div>

<div>

<h3>Quick Links</h3>

<a href="/">Home</a>

<a href="/">Products</a>

<a href="/">Wishlist</a>

<a href="/">Cart</a>

</div>

<div>

<h3>Support</h3>

<a href="/">Help Center</a>

<a href="/">Privacy</a>

<a href="/">Terms</a>

</div>

<div>

<h3>Follow Us</h3>

<div className="socials">

<FaFacebook/>

<FaInstagram/>

<FaLinkedin/>

<FaGithub/>

</div>

</div>

</div>

<hr/>

<p className="copyright">

©2026 ShopEase | All Rights Reserved

</p>

</footer>

)

}

export default Footer;