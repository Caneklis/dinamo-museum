import { Accordions } from "../../components/accordion/js/accordions.js";
let accordions;

const initAccordions = () => {
  accordions = new Accordions();
  // Используйте в разработке экспортируемую переменную accordions, window сделан для бэкэнда
  window.accordions = accordions;
};

export { initAccordions, accordions };
