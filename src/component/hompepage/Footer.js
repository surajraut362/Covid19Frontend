import { Twitter, GitHub, Instagram, Mail, Send } from "react-feather";

export function Footer() {
  return (
    <footer
      className="navbar fixed-bottom p-0 mb-0"
      style={{ textAlign: "center", backgroundColor: "#ededed" }}
    >
      <h6 className="mt-4">
        {"We stand with everyone fighting on the frontlines"}
      </h6>

      <div className="links">
        <a
          href="https://github.com/covid19india/covid19india-react"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://t.me/covid19indiaorg"
          className="telegram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://twitter.com/covid19indiaorg"
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <Twitter />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://instagram.com/covid19indiaorg"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <Instagram />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="mailto:hello@covid19india.org"
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
        <br />
        <p class="copyright" style={{ textColor: "red" }}>
          Copyright@2021. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
