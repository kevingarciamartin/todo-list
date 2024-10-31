import image from "../../img/kevin.jpg";

export default function RenderProfile() {
  const header = document.querySelector("nav header");
  const myProjects = document.querySelector('#my-projects > li');
  const img1 = document.createElement("img");
  const img2 = document.createElement("img");
  const title = document.createElement("h2");

  img1.src = image;
  img2.src = image;
  title.textContent = "Kevin";

  header.appendChild(img1);
  header.appendChild(title);
  myProjects.prepend(img2);
}
