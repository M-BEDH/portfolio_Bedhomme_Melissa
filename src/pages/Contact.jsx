import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { emailConfig, validateEmailConfig } from './emailConfig';
import "../App.css";

gsap.registerPlugin(useGSAP);

function Contact() {
  const containerRef = useRef(null);
  const form = useRef();

  useGSAP(() => {
    if (!containerRef.current) return;
    const titreSpans = containerRef.current.querySelectorAll("h1 span");
    const btns = containerRef.current.querySelectorAll(".btn-first");
     const l1 = containerRef.current.querySelector(".l1");
    const l2 = containerRef.current.querySelector(".l2");
    const lignes = containerRef.current.querySelectorAll(".ligne");
    const textes = containerRef.current.querySelectorAll(".container-contact p, .form-contact label, .form-contact input, .form-contact textarea, .form-contact button");

    const Anim = gsap.timeline({ paused: true });

    Anim
      .staggerFrom(titreSpans, 0.6, { top: -50, opacity: 0, ease: "power2.inOut" }, 0.3)
      .staggerFrom(lignes, 0.7, { opacity: 0, x: -30, ease: "power2.inOut" }, 0.15, "-=0.8")
      .staggerFrom(btns, 0.6, { opacity: 0, ease: "power2.inOut" }, 0.3, "-=0.8")
      .staggerFrom(textes, 0.5, { opacity: 0, y: 30, ease: "power2.inOut" }, 0.4, "-=1")
       .from(l1, 0.6, { scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, "-=1.2")
      .from(l2, 0.6, { scaleX: 0, transformOrigin: "left center", ease: "power2.out"}, "-=1.5")


    Anim.play();
  }, []);

  try {
    validateEmailConfig();
  } catch (e) {
    console.error(e.message);
    // Affichez un message d'erreur à l'utilisateur
  }

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      emailConfig.serviceId,
      emailConfig.templateId,
      form.current,
      emailConfig.publicKey
    )
    .then((result) => {
      alert('Message envoyé...');
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  };

  return (
    <div ref={containerRef}>
      <header>
        <div className="lignes">
          <div className="l1"></div>
          <div className="l2"></div>
        </div>
      </header>

      <main>
        <div className="container-first contact">
          <h1>
            <span>Me </span>
            <span>Contacter </span>
          </h1>
        </div>

        <div className="container-btns contact">
          <Link to="/">
            <button type="button" className="btn-first b2">Accueil</button>
          </Link>
          <Link to="/projet">
            <button type="button" className="btn-first b1">Discover</button>
          </Link>
          <Link to="/a_propos">
            <button type="button" className="btn-first b2">À propos</button>
          </Link>
        </div>
       <div className="cv">
          <a href={process.env.PUBLIC_URL + "/ressources/cv.pdf"}>
           <img src={process.env.PUBLIC_URL + "/ressources/cv.png"}  alt="lien pour accéder au curriculum vitae"/>
           <div className="content">Télécharger le CV</div>
        </a> 
        </div>

        <div className="container-contact">
          <p>
            Si vous avez des questions, des suggestions ou si vous souhaitez discuter d'un projet, n'hésitez pas à me contacter.
          </p>
          <p>
            Vous pouvez me joindre par email via le formulaire ci-dessous. Je me ferai un plaisir de vous répondre dans les plus brefs délais.
          </p>
          <p>
            Pour toute question ou information, veuillez me contacter :
          </p>
        </div>

        <div>
          <form ref={form} onSubmit={sendEmail}>
            <div>
              <input type='text' placeholder='Nom' name='user_name' required='true' />
              <input type='email' placeholder='Email' name='user_email' required='true' />
            </div>
            <div>
              <textarea name='message' type='text' placeholder='Message' required='true'></textarea>
            </div>
            <input type='submit' value='Submit' id='input-submit' />
          </form>
        </div>

        <footer className="footer-contact">
          <p>&copy; 2025 Mélissa Bedhomme. Tous droits réservés.</p>
        </footer>
      </main>
    </div>
  );
}

export default Contact;
