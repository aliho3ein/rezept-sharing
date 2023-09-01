import { FC } from "react";
import style from "./../../styles/startPage/about.module.scss";

const About: FC = () => {
  return (
    <section id="about" className={style.aboutContainer}>
      <div>
        <figure>
          <img src="src/assets/01.png" className={style.onionImg} alt="onion" />
        </figure>
        <h2>Über Tasty Pixel</h2>
        <p>
          Willkommen bei <strong>Tasty Pixel</strong> – einer lebendigen
          Gemeinschaft von leidenschaftlichen Köchen, Foodies und kulinarischen
          Entdeckern! Unsere Plattform ist mehr als nur ein Ort, um Rezepte zu
          teilen. Es ist ein Ort, an dem Geschmack, Kreativität und Gemeinschaft
          sich vereinen, um unvergessliche kulinarische Erlebnisse zu schaffen.
        </p>
        <p>
          Unsere Geschichte begann mit der Vision, Menschen aus der ganzen Welt
          zusammenzubringen, um ihre Liebe zur Küche zu teilen. Wir glauben
          daran, dass Essen nicht nur Nahrung ist, sondern eine universelle
          Sprache, die Kulturen verbindet und Erinnerungen schafft. Unsere
          Plattform dient als Brücke zwischen den Küchen verschiedener Kulturen,
          indem sie es Ihnen ermöglicht, authentische Rezepte aus allen Ecken
          der Welt zu entdecken und zu teilen.
        </p>
        <p>
          Unser Team, bestehend aus kreativen Designern, passionierten Köchen
          und Technologie-Enthusiasten, arbeitet mit Hingabe daran, eine
          benutzerfreundliche und inspirierende Umgebung zu schaffen. Wir
          verstehen die Freude, die in einem perfekt zubereiteten Gericht liegt,
          genauso wie die Begeisterung, ein eigenes Rezept mit anderen zu
          teilen. Unsere Mission ist es, Ihnen die Werkzeuge zu geben, um Ihre
          kulinarischen Ideen zum Leben zu erwecken und sie in einer visuell
          ansprechenden Art und Weise zu präsentieren.
        </p>
        <p>
          Was uns auszeichnet, ist unsere lebendige Gemeinschaft. Bei{" "}
          <strong>Tasty Pixel</strong> geht es nicht nur um Rezepte, sondern
          auch um Geschichten, Erinnerungen und die Freude am Teilen. Sie werden
          auf Gleichgesinnte stoßen, die ebenso leidenschaftlich daran
          interessiert sind, ihre kulinarischen Fähigkeiten zu erweitern und ihr
          Wissen großzügig zu teilen.
        </p>
        <p>
          Wir laden Sie ein, Teil unserer kulinarischen Reise zu werden.
          Entdecken Sie eine Vielzahl von Rezepten, die von unserer Community
          erstellt wurden – von traditionellen Familienrezepten bis hin zu
          innovativen Kreationen. Teilen Sie Ihre eigenen Kreationen,
          Erfahrungen und Tipps, und seien Sie Teil eines globalen Netzwerks von
          Food-Enthusiasten, die die Freude am Kochen und Essen teilen.
        </p>
        <p>
          Vielen Dank, dass Sie sich für <strong>Tasty Pixel</strong>{" "}
          entschieden haben. Gemeinsam werden wir kulinarische Meisterwerke
          erschaffen, Erinnerungen teilen und die Freude am Essen in einer
          einzigartigen Weise zelebrieren. Ihre Leidenschaft ist unsere
          Inspiration, und wir freuen uns darauf, gemeinsam mit Ihnen zu wachsen
          und zu genießen!
        </p>
      </div>
    </section>
  );
};

export default About;
