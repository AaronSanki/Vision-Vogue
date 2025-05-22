import React from "react";
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub, faSquareXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
export default function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src="/Logo.png" alt="Logo" />
                    <div className="footer-content-left-icons">
                        <a href="https://github.com/AaronSanki"><FontAwesomeIcon icon={faSquareGithub} /></a>
                        <a href="https://x.com/AaronSanki88429"><FontAwesomeIcon icon={faSquareXTwitter} /></a>
                        <a href="https://www.linkedin.com/in/aaron-sanki-2336b925a/"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>VISION VOGUE</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-8639935459</li>
                        <li>aaronagasthyasanki@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright  2025 &copy; Vision-Vogue.com - All Rights Reserved.</p>
        </div>
    )
}