import gsap from "gsap";

const defaultOptions = {
  rootMargin: "0px",
  threshold: 0,
};

export function observe(element: HTMLElement, options = defaultOptions) {
  const observer: IntersectionObserver = new IntersectionObserver(
    callback,
    options
  );

  function callback(entries: any[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }

  observer.observe(element);
}

export function animatePerWord(sentence: HTMLElement | null) {
  if (sentence) {
    // split at space or <br/>, but retain <br/>'s
    const words = sentence.innerHTML.split(/(<br>|\s+)/);

    const wrappedWords = words.map((word) => {
      if (
        word === "<br>" ||
        (word.startsWith("<span") && word.endsWith("</span>"))
      ) {
        return word;
      } else {
        return `<span>${word}</span>`;
      }
    });
    sentence.innerHTML = wrappedWords.join(" ");

    const spanArray = Array.from(sentence.children);

    const spans: Array<Element> = spanArray.filter((val) => {
      return val instanceof HTMLSpanElement && val.innerHTML !== " ";
    });

    spans.forEach((span, index: number) => {
      // @ts-ignore
      span.style.display = "inline-block";
      gsap.set(span, { opacity: 0, y: 100 });
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 2,
        delay: 0.2 * index + 1,
        ease: "expo.out",
      });
    });
  }
}
