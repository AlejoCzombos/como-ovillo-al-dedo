import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons/Icons";

export default function Footer() {
  return (
    <footer className="bg-tertiary-300 text-tertiary-900 text-center py-4 flex flex-col justify-center">
      <p>© 2024 Como Ovillo al Dedo</p>
      <div className="flex justify-center gap-5 py-3">
        <a href="https://www.facebook.com/comoovilloaldedo" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://www.instagram.com/comoovillo" target="_blank" rel="noreferrer">
          <InstagramIcon />
        </a>
        <a href="https://www.youtube.com/@ComoOvilloalDedo" target="_blank" rel="noreferrer">
          <YoutubeIcon />
        </a>
        <a href="https://wa.me/+5493795036256" target="_blank" rel="noreferrer">
          <WhatsAppIcon />
        </a>
      </div>
      <p className="py-2">
        Córdoba 951 (3.400)
        <br />
        Corrientes, Argentina
      </p>
      <a
        href="https://comoovilloaldedo.com"
        className="font-bold hover:text-primary-400 transition-all duration-300 ease-in-out"
      >
        www.comoovilloaldedo.com
      </a>
    </footer>
  );
}
