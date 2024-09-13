export const toView = (view) => {
  if (view === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (view === "bottom") {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } else if (view === "right") {
    window.scrollTo({ left: document.body.scrollWidth, behavior: "smooth" });
  } else if (view === "left") {
    window.scrollTo({ left: 0, behavior: "smooth" });
  }
};
