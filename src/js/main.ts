import "../scss/index.scss";
import "./header";
import "./form";
import { setupHero } from "./three";
import { setupForm } from "./form";
import { fetchData } from "./utils/api";
import { observe, animatePerWord } from "./utils/interactions";
import { gsap } from "gsap";

const data = await fetchData();

document.querySelector<HTMLDivElement>("#zilch-nike-promo")!.innerHTML = `
    <section class="zilch-banner">
      <h1 id="main-title">${data.banner.title}</h1>
      <div id="zilch-anim"></div>
    </section>
    <div id="hover-area"></div>
    <section class="zilch-intro">
      <div class="holder-content">
        <h2>${data.intro.title}</h2>
        <h5>${data.intro.subtitle}</h5>
        <p>${data.intro.copy}</p>
      </div>
    </section>
    <section class="zilch-signup">
      <div class="holder-content">
        <form id="sign-up"></form>
      </div>
    </section>
`;

setupHero(document.querySelector<HTMLDivElement>("#zilch-anim")!);
setupForm(document.querySelector<HTMLFormElement>("#sign-up")!, data.signup);

const signup = document.querySelector<HTMLDivElement>(".zilch-signup")!;
const form = document.querySelector<HTMLDivElement>("#sign-up")!;

observe(signup);

const signupTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".zilch-signup",
    start: "top center",
    toggleActions: "restart",
  },
});

signupTL.to(form, {
  y: 0,
  opacity: 1,
  duration: 2,
  ease: "expo.out",
});

animatePerWord(document.querySelector("#main-title")!);
