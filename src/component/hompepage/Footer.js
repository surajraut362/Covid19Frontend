import {
  Twitter,
  GitHub,
  Instagram,
  Mail,
  Send,
  Facebook,
  Telegram,
} from "react-feather";

export function Footer() {
  return (
    <footer
      className="navbar p-0 mb-0 mt-4"
      style={{
        textAlign: "center",
        backgroundColor: "#ededed",
        alignSelf: "baseline",
      }}
    >
      <h6 className="mt-2 ml-2 col-xs-12" align="center">
        {" Copyright@2021 Covid19Tracker. All rights reserved"}
      </h6>

      <div className="mt-1 mr-2 mb-0 col-xs-12 ml-4" align="center">
        <a
          align="center"
          href="https://github.com/covid19india/covid19india-react"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="text-primary" />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="https://instagram.com/covid19indiaorg"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <Instagram className="text-primary" />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href="mailto:hello@covid19india.org"
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="text-primary" />
        </a>
        <p className="copyright col-xs-12" align="center">
          We stand with everyone fighting on the frontlines
        </p>
      </div>
    </footer>
  );
}
