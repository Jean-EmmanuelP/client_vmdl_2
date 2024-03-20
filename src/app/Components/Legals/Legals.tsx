import { LangueCode, useSection } from "@/app/utils/Contextboard";
import { useData } from "@/app/utils/DataContext";
import legalsDataJson from "../../utils/legals-translated.json";
import { useEffect, useState } from "react";

export default function Legals() {
  const { langueCourante } = useSection();
  const { data } = useData();
  const [legalsData, setLegalsData] = useState(legalsDataJson);
  /*
    go to page.tsx > legalsData must be a context
    check a useEffect each time the langCode is updated and setLegalsData again
    take legalsData from useSection and print the content there
  */
  const langCodeMap: { [key in LangueCode]: string } = {
    FR: "fr",
    EN: "en",
    IT: "it",
    ES: "es",
    عربي: "عربي",
    PT: "pt",
    DE: "de",
    中文: "中文",
  };
  const titleWebsite = {
    FR: "Le site",
    EN: "The website",
    ES: "El sitio web",
    عربي: "الموقع الإلكتروني",
    PT: "O site",
    DE: "Die Webseite",
    IT: "Il sito web",
    中文: "网站",
  };
  const privacyPolicy = {
    FR: "Politique de confidentialité des données",
    EN: "Data Privacy Policy",
    ES: "Política de privacidad de datos",
    عربي: "سياسة خصوصية البيانات",
    PT: "Política de privacidade de dados",
    DE: "Datenschutzerklärung",
    IT: "Informativa sulla privacy dei dati",
    中文: "数据隐私政策",
  };

  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const {
    title,
    subtitles: { II: sectionII, III: sectionIII, IV: sectionIV, V: sectionV },
  } = legalsDataJson[langCode as keyof typeof legalsDataJson];
  const WebsiteContent = () => {
    switch (langCode) {
      case "fr":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>Accessible at the following URL</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (hereinafter referred to as the
                &quot;Site&quot;).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. Publisher:</span>
              <ul>
                <li>Vincent Machado Da Luz - Lawyers at the Court</li>
                <li>27 Boulevard Saint-Michel - 75005 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61 - F. +33 (0)1 43 25 62 19 - </li>
                <li>E. cabinet@vmdl.ai vmdl.ai.com</li>
                <li>SIRET No. 83113986000017</li>
                <li>Hereinafter referred to as &quot;VMDL firm&quot;</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. Publication Director</span>
              <ul>
                <li>Jean-Emmanuel Perramant</li>
                <li>96 Bd Bessières - 75017 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61</li>
                <li>E. cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. Site Designer and Developer <br />
                Jean-Emmanuel Perramant Graphics
              </span>
              <ul>
                <li>96 Bd Bessières Paris</li>
                <li>T. +33 (0)6 95 51 14 61</li>
                <li>E. jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>SIRET No. 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. Hosting Provider</span>
              <ul>
                <li>Vercel Inc.</li>
                <li>PO Box 40190 - San Francisco - CA 94140 -</li>
                <li>United States vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "en":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>Accessible at the following URL</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (hereinafter referred to as the
                &quot;Site&quot;).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. Publisher:</span>
              <ul>
                <li>Vincent Machado Da Luz - Lawyers at the Court</li>
                <li>27 Boulevard Saint-Michel - 75005 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61 - F. +33 (0)1 43 25 62 19 - </li>
                <li>E. cabinet@vmdl.ai vmdl.ai.com</li>
                <li>SIRET No. 83113986000017</li>
                <li>Hereinafter referred to as &quot;VMDL firm&quot;</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. Publication Director</span>
              <ul>
                <li>Jean-Emmanuel Perramant</li>
                <li>96 Bd Bessières - 75017 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61</li>
                <li>E. cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. Site Designer and Developer <br />
                Jean-Emmanuel Perramant Graphics
              </span>
              <ul>
                <li>96 Bd Bessières Paris</li>
                <li>T. +33 (0)6 95 51 14 61</li>
                <li>E. jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>SIRET No. 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. Hosting Provider</span>
              <ul>
                <li>Vercel Inc.</li>
                <li>PO Box 40190 - San Francisco - CA 94140 -</li>
                <li>United States vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "es":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>Accesible en la siguiente URL</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (en adelante, el &quot;Sitio&quot;).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. Editor:</span>
              <ul>
                <li>Vincent Machado Da Luz - Abogados ante la Corte</li>
                <li>27 Boulevard Saint-Michel - 75005 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61 - F. +33 (0)1 43 25 62 19 - </li>
                <li>E. cabinet@vmdl.ai vmdl.ai.com</li>
                <li>Nº SIRET 83113986000017</li>
                <li>En adelante &quot;el despacho VMDL&quot;</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. Director de publicación</span>
              <ul>
                <li>Jean-Emmanuel Perramant</li>
                <li>96 Bd Bessières - 75017 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61</li>
                <li>E. cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. Diseñador y desarrollador del sitio <br />
                Jean-Emmanuel Perramant gráficos
              </span>
              <ul>
                <li>96 Bd Bessières Paris</li>
                <li>T. +33 (0)6 95 51 14 61</li>
                <li>E. jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>Nº SIRET 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. Proveedor de alojamiento</span>
              <ul>
                <li>La empresa Vercel</li>
                <li>apartado de correos 40190 - San Francisco - CA 94140 -</li>
                <li>Estados Unidos vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "عربي":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>متاح على العنوان التالي</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (يُشار إليه فيما بعد بـ &quot;الموقع&quot;).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>المحرر:</span>
              <ul>
                <li>فنسنت ماتشادو دا لوز - محامون لدى المحكمة</li>
                <li>27 بوليفار سان ميشيل - 75005 باريس</li>
                <li>ت. +33 (0) 6 85 51 14 61 - ف. +33 (0)1 43 25 62 19 - </li>
                <li>بريد إلكتروني: cabinet@vmdl.ai vmdl.ai.com</li>
                <li>رقم سيريت 83113986000017</li>
                <li>يُشار إليه فيما بعد بـ &quot;مكتب VMDL&quot;</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>مدير النشر</span>
              <ul>
                <li>جان-إيمانويل بيرامانت</li>
                <li>96 بد بيسييرس - 75017 باريس</li>
                <li>ت. +33 (0) 6 85 51 14 61</li>
                <li>بريد إلكتروني: cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                مصمم ومطور الموقع <br />
                جان-إيمانويل بيرامانت للجرافيك
              </span>
              <ul>
                <li>96 بد بيسييرس باريس</li>
                <li>ت. +33 (0)6 95 51 14 61</li>
                <li>بريد إلكتروني: jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>رقم سيريت 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>مسؤول الاستضافة</span>
              <ul>
                <li>شركة Vercel</li>
                <li>صندوق بريد 40190 - سان فرانسيسكو - CA 94140 -</li>
                <li>الولايات المتحدة vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "pt":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>Acessível no seguinte URL</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (doravante referido como &quot;o Site&quot;).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. Editor:</span>
              <ul>
                <li>Vincent Machado Da Luz - Advogados à Corte</li>
                <li>27 Boulevard Saint-Michel - 75005 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61 - F. +33 (0)1 43 25 62 19 - </li>
                <li>E. cabinet@vmdl.ai vmdl.ai.com</li>
                <li>Nº SIRET 83113986000017</li>
                <li>Doravante denominado &quot;o escritório VMDL&quot;</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. Diretor de Publicação</span>
              <ul>
                <li>Jean-Emmanuel Perramant</li>
                <li>96 Bd Bessières - 75017 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61</li>
                <li>E. cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. Designer e Desenvolvedor do Site <br />
                Jean-Emmanuel Perramant Gráficos
              </span>
              <ul>
                <li>96 Bd Bessières Paris</li>
                <li>T. +33 (0)6 95 51 14 61</li>
                <li>E. jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>Nº SIRET 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. Provedor de Hospedagem</span>
              <ul>
                <li>A empresa Vercel</li>
                <li>Caixa Postal 40190 - San Francisco - CA 94140 -</li>
                <li>Estados Unidos vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "it":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>Accessibile al seguente URL</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (di seguito denominato &quot;il Sito&quot;).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. Editore:</span>
              <ul>
                <li>Vincent Machado Da Luz - Avvocati presso la Corte</li>
                <li>27 Boulevard Saint-Michel - 75005 PARIGI</li>
                <li>T. +33 (0) 6 85 51 14 61 - F. +33 (0)1 43 25 62 19 - </li>
                <li>E. cabinet@vmdl.ai vmdl.ai.com</li>
                <li>N° SIRET 83113986000017</li>
                <li>D&apos;ora in poi denominato &quot;lo studio VMDL&quot;</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. Direttore della Pubblicazione</span>
              <ul>
                <li>Jean-Emmanuel Perramant</li>
                <li>96 Bd Bessières - 75017 PARIGI</li>
                <li>T. +33 (0) 6 85 51 14 61</li>
                <li>E. cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. Designer e Sviluppatore del Sito <br />
                Jean-Emmanuel Perramant Grafica
              </span>
              <ul>
                <li>96 Bd Bessières Parigi</li>
                <li>T. +33 (0)6 95 51 14 61</li>
                <li>E. jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>N° SIRET 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. Responsabile dell&apos;Hosting</span>
              <ul>
                <li>La società Vercel</li>
                <li>Casella Postale 40190 - San Francisco - CA 94140 -</li>
                <li>Stati Uniti vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "de":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>Zugänglich unter der folgenden URL</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (im Folgenden &quot;die Website&quot; genannt).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. Herausgeber:</span>
              <ul>
                <li>Vincent Machado Da Luz - Rechtsanwälte beim Gericht</li>
                <li>27 Boulevard Saint-Michel - 75005 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61 - F. +33 (0)1 43 25 62 19 - </li>
                <li>E. cabinet@vmdl.ai vmdl.ai.com</li>
                <li>SIRET Nr. 83113986000017</li>
                <li>Im Folgenden &quot;die Kanzlei VMDL&quot; genannt</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. Veröffentlichungsleiter</span>
              <ul>
                <li>Jean-Emmanuel Perramant</li>
                <li>96 Bd Bessières - 75017 PARIS</li>
                <li>T. +33 (0) 6 85 51 14 61</li>
                <li>E. cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. Designer und Entwickler der Website <br />
                Jean-Emmanuel Perramant Grafikdesign
              </span>
              <ul>
                <li>96 Bd Bessières Paris</li>
                <li>T. +33 (0)6 95 51 14 61</li>
                <li>E. jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>SIRET Nr. 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. Hosting-Anbieter</span>
              <ul>
                <li>Das Unternehmen Vercel</li>
                <li>Postfach 40190 - San Francisco - CA 94140 -</li>
                <li>USA vercel.com</li>
              </ul>
            </p>
          </div>
        );
      case "中文":
        return (
          <div className="text-[11px] flex flex-col">
            <p className="flex flex-col py-2">
              <span>可通过以下网址访问</span>
              <a href="http://www.vmdl.ai.com">
                : http://www.vmdl.ai.com (以下简称“网站”).
              </a>
            </p>
            <p className="flex flex-col py-2">
              <span>I.I. 出版者：</span>
              <ul>
                <li>文森特·马查多·达·卢兹 - 法庭律师</li>
                <li>27号圣米歇尔大道 - 75005 巴黎</li>
                <li>
                  电话 +33 (0) 6 85 51 14 61 - 传真 +33 (0)1 43 25 62 19 -{" "}
                </li>
                <li>电邮 cabinet@vmdl.ai vmdl.ai.com</li>
                <li>商业注册号 83113986000017</li>
                <li>以下简称“VMDL律师事务所”</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.II. 出版负责人</span>
              <ul>
                <li>让-埃马纽埃尔·佩拉曼</li>
                <li>96号贝西埃尔大道 - 75017 巴黎</li>
                <li>电话 +33 (0) 6 85 51 14 61</li>
                <li>电邮 cabinet@vmdl.ai</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>
                I.III. 网站设计与开发 <br />
                让-埃马纽埃尔·佩拉曼图形设计
              </span>
              <ul>
                <li>96号贝西埃尔大道巴黎</li>
                <li>电话 +33 (0)6 95 51 14 61</li>
                <li>电邮 jperrama@gmail.com</li>
                <li>
                  <a href="jperrama.com">jperrama.com</a>
                </li>
                <li>商业注册号 83113986000017</li>
              </ul>
            </p>
            <p className="flex flex-col py-2">
              <span>I.IV. 托管服务提供商</span>
              <ul>
                <li>维塞尔公司</li>
                <li>邮政信箱 40190 - 旧金山 - 加利福尼亚州 94140 -</li>
                <li>美国 vercel.com</li>
              </ul>
            </p>
          </div>
        );
      default:
        return <div>Error: Invalid</div>;
    }
  };
  const DataPrivacyPolicy = () => {
    switch (langCode) {
      case "en":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. Data Privacy Policy
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              The Data Privacy Policy of the website https://www.vmdl.ai/ is
              established in accordance with Articles 13 and 14 of the General
              Data Protection Regulation (2016/679) and Article 32 of the Data
              Protection Act of January 6, 1978.​
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>Nature of Collected Data</span>
                <p>
                  In the context of the operation of the Site, the Firm may
                  collect the following data about you as the data controller:
                </p>
                <ul>
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>IP address</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>Purpose of the Processing</span>
                <p>
                  Within the framework of the Site&apos;s operation, the processing
                  of personal data aims at customer management, personalized
                  solicitation, loyalty operations, the development of
                  statistics, the management of requests for access,
                  rectification, and opposition rights, and the management of
                  people&apos;s opinions about the VMDL firm. More broadly, in the
                  context of processing a file, whether it is a legal, judicial,
                  or arbitration case, the VMDL firm pays particular attention
                  to the integrity of your data for the protection of your
                  privacy, in accordance with its ethical obligations.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Rights of the Site Users</span>
                <p>
                  For all your personal data, you have the right to access,
                  rectify, and delete data concerning you, in accordance with
                  the amended law of January 6, 1978. You can also, for
                  legitimate reasons, oppose the processing of your data. All
                  these rights can be exercised with the VMDL firm by sending an
                  email to the following address: cabinet@vmdl.ai. In the event
                  that you consider your data was not protected, you also have
                  the right to lodge a complaint with a supervisory authority
                  (CNIL).
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Communication of Personal Data to Third Parties</span>
                <p>
                  Based on legal obligations, your personal data may be
                  disclosed pursuant to a law, regulation, or by a decision of a
                  competent regulatory or judicial authority. In general, we
                  commit to complying with all the legal rules that might
                  prevent, limit, or regulate the dissemination of information
                  or data.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Data Retention Duration</span>
                <p>
                  Your data is processed and stored by the VMDL firm from the
                  moment of your initial contact, including for the simple
                  preparation of a quote or when making an appointment. They are
                  not kept beyond the time necessary to achieve the purposes
                  described in this Policy.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Data Transfer Outside the European Union</span>
                <p>
                  The VMDL firm commits to respecting the applicable regulations
                  regarding transfers of data to foreign countries offering an
                  equivalent level of protection, and to obtain authorization
                  from the CNIL to proceed with such a transfer in case the
                  recipient country does not provide such a level of protection.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Data Security</span>
                <p>
                  The VMDL firm implements all appropriate technical and
                  organizational measures through physical and logistical
                  security means to guarantee a level of security adapted to the
                  risks of accidental, unauthorized, or illegal access,
                  disclosure, alteration, loss, or even destruction of your
                  personal data.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Requests</span>
                <p>
                  For any request concerning the data protection policy of the
                  Site&apos;s users, and to exercise your rights, you can contact the
                  firm at the email address cabinet@vmdl.ai.
                </p>
              </div>
            </div>
          </div>
        );
      case "fr":
        return (
          <div className=" bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. {privacyPolicy[langueCourante]}
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              La Politique de confidentialité des données du site
              https://www.vmdl.ai/ est prise en application des articles 13 et
              14 du Règlement européen Général sur la Protection des Données
              (2016/679) et de l&apos;article 32 de la loi Informatique et
              Libertés du 6 janvier 1978.​
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>Nature des données collectées</span>
                <p>
                  Dans le cadre de l&apos;exploitation du Site, le Cabinet est
                  susceptible de collecter les données suivantes vous concernant
                  en tant que responsable de traitement :
                </p>
                <ul>
                  <li>Nom et prénom</li>
                  <li>Adresse électronique</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse IP</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>Finalité des traitements</span>
                <p>
                  Dans le cadre de l&apos;exploitation du Site, le traitement de
                  données personnelles a pour finalité la gestion des clients,
                  la sollicitation personnalisée, les opérations de
                  fidélisation, l&apos;élaboration de statistiques, la gestion
                  des demandes de droit d&apos;accès, de rectification et
                  d&apos;opposition, la gestion des avis des personnes sur le
                  cabinet VMDL. Plus globalement, dans le cadre du traitement
                  d&apos;un dossier, qu&apos;il s&apos;agisse d&apos;un dossier
                  juridique, judiciaire ou d&apos;arbitrage, le cabinet VMDL
                  veille particulièrement à l&apos;intégrité de vos données aux
                  fins de protection de votre vie privée, conformément à ses
                  obligations déontologiques.
                </p>
              </div>
              <p className="flex flex-col py-2">
                <span>Droits des utilisateurs du Site</span>
                <p>
                  Pour l&apos;ensemble de vos données personnelles, vous
                  disposez d&apos;un droit d&apos;accès, de rectification et de
                  suppression des données vous concernant, conformément à la loi
                  du 6 janvier 1978 modifiée. Vous pouvez également, pour des
                  motifs légitimes, vous opposer au traitement de vos données.
                  L&apos;ensemble de ces droits s&apos;exerce auprès du cabinet
                  VMDL, en adressant un e-mail à l&apos;adresse suivante :
                  cabinet@vmdl.ai. Dans l&apos;hypothèse où vous considèreriez
                  que vos données n&apos;ont pas été protégées, vous disposez
                  également du droit d&apos;introduire une réclamation auprès
                  d&apos;une autorité de contrôle (CNIL).
                </p>
              </p>
              <p className="flex flex-col py-2">
                <span>Communication des données personnelles à des tiers</span>
                <p>
                  Sur la base des obligations légales, vos données personnelles
                  pourront être divulguées en application d&apos;une loi,
                  d&apos;un règlement ou en vertu d&apos;une décision d&apos;une
                  autorité réglementaire ou judiciaire compétente. De manière
                  générale, nous nous engageons à nous conformer à toutes les
                  règles légales qui pourraient empêcher, limiter ou réglementer
                  la diffusion d&apos;informations ou de données.
                </p>
              </p>
              <p className="flex flex-col py-2">
                <span>Durée de conservation des données</span>
                Vos données sont traitées et conservées par le cabinet VMDL dès
                votre prise d&apos;attache, y compris pour le simple
                établissement d&apos;un devis ou lors de la prise de
                rendez-vous. Elles ne sont pas conservées au-delà du temps
                nécessaire à la réalisation des finalités décrites dans la
                présente Politique.
              </p>
              <p className="flex flex-col py-2">
                <span>
                  Transfert des données en dehors de l&apos;Union Européenne
                </span>
                Le cabinet VMDL s&apos;engage à respecter la réglementation
                applicable relative aux transferts des données vers des pays
                étrangers offrant un niveau de protection équivalent, et à
                obtenir une autorisation auprès de la CNIL pour procéder à un
                tel transfert dans le cas où le pays destinataire ne disposerait
                pas d&apos;un tel niveau de protection.
              </p>
              <p className="flex flex-col py-2">
                <span>Sécurité des données</span>
                Le cabinet VMDL met en œuvre toutes les mesures techniques et
                organisationnelles appropriées grâce à des moyens de
                sécurisation physiques et logistiques afin de garantir un niveau
                de sécurité adapté au regard des risques d&apos;accès
                accidentels, non autorisés ou illégaux, de divulgation,
                d&apos;altération, de perte ou encore de destruction des données
                personnelles vous concernant.
              </p>
              <p className="flex flex-col py-2">
                <span>Demandes</span>
                Pour toute demande concernant la politique de protection des
                données des utilisateur du Site, et pour exercer vos droits vous
                pouvez contacter le cabinet à l&apos;adressecabinet@vmdl.ai
              </p>
            </div>
          </div>
        );
      case "es":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. Política de Privacidad de Datos
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              La Política de Privacidad de Datos del sitio https://www.vmdl.ai/
              se establece en conformidad con los artículos 13 y 14 del
              Reglamento General de Protección de Datos (2016/679) y el artículo
              32 de la Ley de Informática y Libertades del 6 de enero de 1978.
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>Naturaleza de los Datos Recogidos</span>
                <p>
                  En el contexto de la operación del Sitio, el Bufete puede
                  recoger los siguientes datos sobre usted como responsable del
                  tratamiento:
                </p>
                <ul>
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección IP</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>Finalidad del Tratamiento</span>
                <p>
                  Dentro del marco de la operación del Sitio, el tratamiento de
                  datos personales tiene como finalidad la gestión de clientes,
                  la solicitud personalizada, operaciones de fidelización,
                  elaboración de estadísticas, gestión de solicitudes de acceso,
                  rectificación y oposición, y la gestión de opiniones de
                  personas sobre el bufete VMDL. Más ampliamente, en el contexto
                  del tratamiento de un expediente, ya sea jurídico, judicial o
                  de arbitraje, el bufete VMDL presta especial atención a la
                  integridad de sus datos con fines de protección de su
                  privacidad, conforme a sus obligaciones éticas.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Derechos de los Usuarios del Sitio</span>
                <p>
                  Para todos sus datos personales, usted dispone de derecho de
                  acceso, rectificación y supresión de los datos que le
                  conciernen, conforme a la ley modificada del 6 de enero de
                  1978. También puede, por motivos legítimos, oponerse al
                  tratamiento de sus datos. Todos estos derechos se ejercen ante
                  el bufete VMDL, enviando un correo electrónico a la siguiente
                  dirección: cabinet@vmdl.ai. En caso de que considere que sus
                  datos no han sido protegidos, también tiene derecho a
                  presentar una reclamación ante una autoridad de control
                  (CNIL).
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Comunicación de Datos Personales a Terceros</span>
                <p>
                  En base a obligaciones legales, sus datos personales podrán
                  ser divulgados conforme a una ley, reglamento o por decisión
                  de una autoridad reguladora o judicial competente. En general,
                  nos comprometemos a cumplir con todas las normas legales que
                  podrían prevenir, limitar o regular la difusión de información
                  o datos.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Duración de la Conservación de los Datos</span>
                <p>
                  Sus datos son tratados y conservados por el bufete HAÏK &
                  ASOCIADOS desde su primer contacto, incluso para la simple
                  elaboración de un presupuesto o al tomar una cita. No se
                  conservan más allá del tiempo necesario para lograr los fines
                  descritos en esta Política.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Transferencia de Datos Fuera de la Unión Europea</span>
                <p>
                  El bufete VMDL se compromete a respetar la normativa aplicable
                  relativa a las transferencias de datos a países extranjeros
                  que ofrezcan un nivel de protección equivalente, y a obtener
                  una autorización de la CNIL para proceder a tal transferencia
                  en caso de que el país destinatario no ofrezca dicho nivel de
                  protección.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Seguridad de los Datos</span>
                <p>
                  El bufete VMDL implementa todas las medidas técnicas y
                  organizativas apropiadas mediante medios de seguridad físicos
                  y logísticos para garantizar un nivel de seguridad adecuado
                  frente a los riesgos de acceso accidental, no autorizado o
                  ilegal, divulgación, alteración, pérdida o incluso destrucción
                  de sus datos personales.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Solicitudes</span>
                <p>
                  Para cualquier solicitud relativa a la política de protección
                  de datos de los usuarios del Sitio, y para ejercer sus
                  derechos, puede contactar al bufete en la dirección de correo
                  electrónico cabinet@vmdl.ai.
                </p>
              </div>
            </div>
          </div>
        );
      case "it":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. Politica sulla Privacy dei Dati
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              La Politica sulla Privacy dei Dati del sito https://www.vmdl.ai/ è
              redatta in conformità agli articoli 13 e 14 del Regolamento
              Generale sulla Protezione dei Dati (2016/679) e all&apos;articolo 32
              della legge Informatica e Libertà del 6 gennaio 1978.
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>Natura dei Dati Raccolti</span>
                <p>
                  Nel contesto del funzionamento del Sito, lo Studio potrebbe
                  raccogliere i seguenti dati su di te come responsabile del
                  trattamento:
                </p>
                <ul>
                  <li>Nome e cognome</li>
                  <li>Indirizzo email</li>
                  <li>Numero di telefono</li>
                  <li>Indirizzo IP</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>Finalità del Trattamento</span>
                <p>
                  Nel quadro dell&apos;operatività del Sito, il trattamento dei dati
                  personali ha lo scopo di gestire i clienti, sollecitazioni
                  personalizzate, operazioni di fidelizzazione, elaborazione di
                  statistiche, gestione delle richieste di accesso, rettifica e
                  opposizione, gestione dei pareri delle persone riguardo allo
                  studio VMDL. Più in generale, nel contesto del trattamento di
                  un fascicolo, sia che si tratti di una questione legale,
                  giudiziaria o di arbitrato, lo studio VMDL presta particolare
                  attenzione all&apos;integrità dei tuoi dati al fine di proteggere
                  la tua privacy, conformemente ai suoi obblighi deontologici.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Diritti degli Utenti del Sito</span>
                <p>
                  Per tutti i tuoi dati personali, hai il diritto di accesso,
                  rettifica e cancellazione dei dati che ti riguardano,
                  conformemente alla legge modificata del 6 gennaio 1978. Puoi
                  anche, per motivi legittimi, opporsi al trattamento dei tuoi
                  dati. Tutti questi diritti possono essere esercitati presso lo
                  studio VMDL inviando un&apos;email all&apos;indirizzo seguente:
                  cabinet@vmdl.ai. Nel caso in cui ritieni che i tuoi dati non
                  siano stati protetti, hai anche il diritto di presentare un
                  reclamo presso un&apos;autorità di controllo (CNIL).
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Comunicazione dei Dati Personali a Terzi</span>
                <p>
                  Sulla base degli obblighi legali, i tuoi dati personali
                  possono essere divulgati in applicazione di una legge, di un
                  regolamento o in virtù di una decisione di un&apos;autorità
                  regolamentare o giudiziaria competente. In generale, ci
                  impegniamo a rispettare tutte le regole legali che potrebbero
                  impedire, limitare o regolamentare la diffusione di
                  informazioni o dati.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Durata della Conservazione dei Dati</span>
                <p>
                  I tuoi dati sono trattati e conservati dallo studio VMDL dal
                  momento del tuo primo contatto, anche per la semplice
                  elaborazione di un preventivo o per la presa di un
                  appuntamento. Non sono conservati oltre il tempo necessario
                  per realizzare le finalità descritte in questa Politica.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>
                  Trasferimento dei Dati al di Fuori dell&apos;Unione Europea
                </span>
                <p>
                  Lo studio VMDL si impegna a rispettare la normativa
                  applicabile relativa ai trasferimenti di dati verso paesi
                  esteri che offrano un livello di protezione equivalente, e ad
                  ottenere un&apos;autorizzazione dalla CNIL per procedere a tale
                  trasferimento nel caso in cui il paese destinatario non
                  disponga di tale livello di protezione.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Sicurezza dei Dati</span>
                <p>
                  Lo studio VMDL adotta tutte le misure tecniche e organizzative
                  appropriate mediante l&apos;utilizzo di mezzi fisici e logistici
                  per garantire un livello di sicurezza adeguato al rischio di
                  accessi accidentali, non autorizzati o illeciti, divulgazione,
                  alterazione, perdita o distruzione dei dati personali che ti
                  riguardano.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Richieste</span>
                <p>
                  Per qualsiasi richiesta riguardante la politica di protezione
                  dei dati degli utenti del Sito, e per esercitare i tuoi
                  diritti, puoi contattare lo studio all&apos;indirizzo email
                  cabinet@vmdl.ai.
                </p>
              </div>
            </div>
          </div>
        );
      case "عربي":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. سياسة خصوصية البيانات
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              تم وضع سياسة خصوصية البيانات للموقع https://www.vmdl.ai/ وفقًا
              للمواد 13 و 14 من اللائحة العامة لحماية البيانات (2016/679)
              والمادة 32 من قانون الحوسبة والحريات المؤرخ 6 يناير 1978.
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>طبيعة البيانات المجمعة</span>
                <p>
                  في سياق تشغيل الموقع، قد يجمع المكتب البيانات التالية عنك
                  كمسؤول عن المعالجة:
                </p>
                <ul>
                  <li>الاسم واللقب</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>عنوان IP</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>غرض المعالجة</span>
                <p>
                  ضمن إطار تشغيل الموقع، يهدف معالجة البيانات الشخصية إلى إدارة
                  العملاء، الدعوة الشخصية، عمليات الولاء، تطوير الإحصائيات،
                  إدارة طلبات الوصول، التصحيح والاعتراض، إدارة آراء الأشخاص حول
                  مكتب VMDL. وبشكل أوسع، في سياق معالجة ملف، سواء كان قانونيًا
                  أو قضائيًا أو تحكيمًا، يولي مكتب VMDL اهتمامًا خاصًا بسلامة
                  بياناتك لحماية خصوصيتك، وفقًا لالتزاماته الأخلاقية.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>حقوق مستخدمي الموقع</span>
                <p>
                  لجميع بياناتك الشخصية، لديك حق الوصول، التصحيح، وحذف البيانات
                  التي تخصك، وفقًا للقانون المعدل بتاريخ 6 يناير 1978. يمكنك
                  أيضًا، لأسباب مشروعة، الاعتراض على معالجة بياناتك. يمكن ممارسة
                  كل هذه الحقوق لدى مكتب VMDL، بإرسال بريد إلكتروني إلى العنوان
                  التالي: cabinet@vmdl.ai. في حال اعتقدت أن بياناتك لم تحمى بشكل
                  كاف، لديك أيضًا الحق في تقديم شكوى إلى سلطة رقابية (CNIL).
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>تواصلالبيانات الشخصية مع الأطراف الثالثة</span>
                <p>
                  بناءً على الالتزامات القانونية، قد يتم الكشف عن بياناتك
                  الشخصية وفقًا لقانون، أو لائحة، أو بموجب قرار من سلطة تنظيمية
                  أو قضائية مختصة. بشكل عام، نلتزم بالامتثال لجميع القواعد
                  القانونية التي قد تمنع، أو تحد، أو تنظم نشر المعلومات أو
                  البيانات.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>مدة الاحتفاظ بالبيانات</span>
                <p>
                  يتم معالجة بياناتك والاحتفاظ بها من قبل مكتب VMDL منذ لحظة
                  تواصلك الأولى، بما في ذلك لمجرد إعداد عرض سعر أو عند تحديد
                  موعد. لا يتم الاحتفاظ بها لفترة تتجاوز الوقت اللازم لتحقيق
                  الأغراض الموصوفة في هذه السياسة.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>نقل البيانات خارج الاتحاد الأوروبي</span>
                <p>
                  يلتزم مكتب VMDL بالامتثال للتشريعات المطبقة بشأن نقل البيانات
                  إلى دول خارجية توفر مستوى مكافئ من الحماية، والحصول على تصريح
                  من CNIL للمضي قدمًا في مثل هذا النقل في حالة عدم توفير الدولة
                  المستقبلة لمثل هذا المستوى من الحماية.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>أمان البيانات</span>
                <p>
                  يطبق مكتب VMDL جميع التدابير التقنية والتنظيمية المناسبة من
                  خلال استخدام وسائل أمان فعلية ولوجستية لضمان مستوى من الأمان
                  المناسب مقابل مخاطر الوصول العرضي، أو غير المصرح به، أو الغير
                  قانوني، أو الكشف، أو التغيير، أو الفقدان، أو حتى تدمير بياناتك
                  الشخصية.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>الطلبات</span>
                <p>
                  لأي طلب يتعلق بسياسة حماية بيانات مستخدمي الموقع، ولممارسة
                  حقوقك، يمكنك الاتصال بالمكتب على البريد الإلكتروني
                  cabinet@vmdl.ai.
                </p>
              </div>
            </div>
          </div>
        );
      case "pt":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. Política de Privacidade de Dados
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              A Política de Privacidade de Dados do site https://www.vmdl.ai/ é
              estabelecida de acordo com os artigos 13 e 14 do Regulamento Geral
              sobre a Proteção de Dados (2016/679) e o artigo 32 da Lei de
              Informática e Liberdades de 6 de janeiro de 1978.
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>Natureza dos Dados Coletados</span>
                <p>
                  No contexto da operação do Site, o Escritório pode coletar os
                  seguintes dados sobre você como responsável pelo tratamento:
                </p>
                <ul>
                  <li>Nome e sobrenome</li>
                  <li>Endereço de email</li>
                  <li>Número de telefone</li>
                  <li>Endereço IP</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>Finalidade do Tratamento</span>
                <p>
                  No âmbito da operação do Site, o tratamento de dados pessoais
                  visa a gestão de clientes, solicitação personalizada,
                  operações de fidelização, elaboração de estatísticas, gestão
                  de pedidos de acesso, retificação e oposição, e gestão de
                  opiniões das pessoas sobre o escritório VMDL. De forma mais
                  ampla, no contexto do tratamento de um arquivo, seja ele
                  jurídico, judicial ou de arbitragem, o escritório VMDL presta
                  especial atenção à integridade dos seus dados com o objetivo
                  de proteger a sua privacidade, de acordo com as suas
                  obrigações éticas.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Direitos dos Usuários do Site</span>
                <p>
                  Para todos os seus dados pessoais, você tem o direito de
                  acesso, retificação e exclusão dos dados que lhe dizem
                  respeito, de acordo com a lei modificada de 6 de janeiro de
                  1978. Você também pode, por motivos legítimos, se opor ao
                  tratamento dos seus dados. Todos esses direitos podem ser
                  exercidos junto ao escritório VMDL, enviando um email para o
                  seguinte endereço: cabinet@vmdl.ai. Caso considere que seus
                  dados não foram protegidos, você também tem o direito de
                  apresentar uma reclamação a uma autoridade de controle (CNIL).
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Comunicação dos Dados Pessoais a Terceiros</span>
                <p>
                  Com base em obrigações legais, seus dados pessoais podem ser
                  divulgados em aplicação de uma lei, regulamento ou por decisão
                  de uma autoridade regulatória ou judicial competente. De forma
                  geral, comprometemo-nos a cumprir todas as regras legais que
                  possam impedir, limitar ou regular a disseminação de
                  informações ou dados.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Duração da Conservação dos Dados</span>
                <p>
                  Seus dados são processados e armazenados pelo escritório VMDL
                  desde o seu primeiro contato, incluindo para a simples
                  elaboração de um orçamento ou durante o agendamento de uma
                  consulta. Eles não são mantidos além do tempo necessário para
                  alcançar os propósitos descritos nesta Política.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Transferência de Dados para Fora da União Europeia</span>
                <p>
                  O escritório VMDL compromete-se a respeitar a regulamentação
                  aplicável relativa às transferências de dados para países
                  estrangeiros que ofereçam um nível de proteção equivalente, e
                  a obter uma autorização da CNIL para proceder a tal
                  transferência caso o país destinatário não disponha desse
                  nível de proteção.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Segurança dos Dados</span>
                <p>
                  O escritório VMDL implementa todas as medidas técnicas e
                  organizacionais adequadas através de meios físicos e
                  logísticos para garantir um nível de segurança apropriado
                  contra os riscos de acesso acidental, não autorizado ou
                  ilegal, divulgação, alteração, perda ou mesmo destruição dos
                  dados pessoais concernentes.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Pedidos</span>
                <p>
                  Para qualquer solicitação relativa à política de proteção de
                  dados dos usuários do Site, e para exercer seus direitos, você
                  pode contatar o escritório pelo endereço de email
                  cabinet@vmdl.ai.
                </p>
              </div>
            </div>
          </div>
        );
      case "de":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. Datenschutzrichtlinie
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              Die Datenschutzrichtlinie der Website https://www.vmdl.ai/ wird
              gemäß den Artikeln 13 und 14 der Allgemeinen Datenschutzverordnung
              (2016/679) und Artikel 32 des Datenschutz- und Freiheitsgesetzes
              vom 6. Januar 1978 erstellt.
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>Natur der gesammelten Daten</span>
                <p>
                  Im Rahmen des Betriebs der Website kann die Kanzlei die
                  folgenden Daten über Sie als Verantwortlicher erheben:
                </p>
                <ul>
                  <li>Vor- und Nachname</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer</li>
                  <li>IP-Adresse</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>Zweck der Verarbeitung</span>
                <p>
                  Im Rahmen des Websitebetriebs zielt die Verarbeitung
                  personenbezogener Daten auf die Kundenverwaltung,
                  personalisierte Ansprache, Treueaktionen, Erstellung von
                  Statistiken, Bearbeitung von Anfragen nach Zugang,
                  Berichtigung und Widerspruch und die Verwaltung der Meinungen
                  der Personen über die Kanzlei VMDL. Allgemeiner gesagt, im
                  Rahmen der Bearbeitung einer Akte, sei es eine rechtliche,
                  gerichtliche oder Schiedsangelegenheit, achtet die Kanzlei
                  VMDL besonders auf die Integrität Ihrer Daten zum Schutz Ihrer
                  Privatsphäre, entsprechend ihren ethischen Verpflichtungen.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Rechte der Nutzer der Website</span>
                <p>
                  Für alle Ihre personenbezogenen Daten haben Sie ein Recht auf
                  Zugang, Berichtigung und Löschung der Sie betreffenden Daten
                  gemäß dem geänderten Gesetz vom 6. Januar 1978. Sie können
                  auch aus legitimen Gründen der Verarbeitung Ihrer Daten
                  widersprechen. Alle diese Rechte können bei der Kanzlei VMDL
                  ausgeübt werden, indem Sie eine E-Mail an die folgende Adresse
                  senden: cabinet@vmdl.ai. Sollten Sie der Meinung sein, dass
                  Ihre Daten nicht geschützt wurden, haben Sie auch das Recht,
                  eine Beschwerde bei einer Aufsichtsbehörde (CNIL)
                  einzureichen.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Weitergabe personenbezogener Daten an Dritte</span>
                <p>
                  Aufgrund gesetzlicher Verpflichtungen können Ihre
                  personenbezogenen Daten aufgrund eines Gesetzes, einer
                  Verordnung oder durch eine Entscheidung einer zuständigen
                  Regulierungs- oder Justizbehörde offengelegt werden. Im
                  Allgemeinen verpflichten wir uns, alle gesetzlichen Regeln
                  einzuhalten, die die Verbreitung von Informationen oder Daten
                  verhindern, einschränken oder regulieren könnten.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Dauer der Datenspeicherung</span>
                <p>
                  Ihre Daten werden von der Kanzlei VMDL ab Ihrem ersten Kontakt
                  verarbeitet und gespeichert, einschließlich der einfachen
                  Erstellung eines Angebots oder bei der Terminvereinbarung. Sie
                  werden nicht länger aufbewahrt, als es für die in dieser
                  Richtlinie beschriebenen Zwecke erforderlich ist.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>
                  Übermittlung von Daten außerhalb der Europäischen Union
                </span>
                <p>
                  Die Kanzlei VMDL verpflichtet sich, die anwendbaren
                  Vorschriften für die Übermittlung von Daten an Länder
                  außerhalb der Europäischen Union, die ein ang emessenes
                  Schutzniveau bieten, einzuhalten und eine Genehmigung von der
                  CNIL einzuholen, bevor eine solche Übermittlung erfolgt, falls
                  das Empfängerland nicht über ein solches Schutzniveau verfügt.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Datensicherheit</span>
                <p>
                  Die Kanzlei VMDL setzt alle geeigneten technischen und
                  organisatorischen Maßnahmen durch physische und logistische
                  Sicherheitsmittel ein, um ein dem Risiko angemessenes
                  Sicherheitsniveau gegen unbeabsichtigten oder unrechtmäßigen
                  Zugriff, Offenlegung, Veränderung, Verlust oder auch
                  Zerstörung Ihrer personenbezogenen Daten zu gewährleisten.
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>Anfragen</span>
                <p>
                  Für alle Anfragen bezüglich der Datenschutzpolitik der Nutzer
                  der Website und zur Ausübung Ihrer Rechte können Sie sich an
                  die Kanzlei unter der E-Mail-Adresse cabinet@vmdl.ai wenden.
                </p>
              </div>
            </div>
          </div>
        );
      case "中文":
        return (
          <div className="bg-cyan-200/60 p-2 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                VI. 数据隐私政策
              </h1>
            </div>
            <div className="p-2 text-[11px]">
              本网站 https://www.vmdl.ai/
              的数据隐私政策是根据《一般数据保护条例》(2016/679)的第13条和第14条以及1978年1月6日的《数据与自由法》第32条制定的。
            </div>
            <div className="text-[11px] flex flex-col">
              <div className="flex flex-col py-2">
                <span>收集的数据性质</span>
                <p>
                  在网站运营的背景下，律师事务所可能会作为数据控制者收集您的以下信息：
                </p>
                <ul>
                  <li>姓名和姓氏</li>
                  <li>电子邮箱地址</li>
                  <li>电话号码</li>
                  <li>IP地址</li>
                </ul>
              </div>
              <div className="flex flex-col py-2">
                <span>处理目的</span>
                <p>
                  在网站运营的框架内，个人数据处理的目的是客户管理、个性化招揽、忠诚度操作、统计数据编制、处理访问、修正和反对请求，以及管理人们对VMDL律师事务所的看法。更广泛地说，在处理任何法律、司法或仲裁案件的框架内，VMDL律师事务所特别注意保护您的数据完整性，以保护您的隐私，符合其职业道德义务。
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>网站用户的权利</span>
                <p>
                  对于您的所有个人数据，您根据1978年1月6日修订的法律，有权访问、更正和删除与您有关的数据。您也可以出于正当理由反对处理您的数据。所有这些权利都可以通过向VMDL律师事务所发送电子邮件至以下地址来行使：cabinet@vmdl.ai。如果您认为您的数据没有得到保护，您也有权向监管机构（CNIL）提出投诉。
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>向第三方通信个人数据</span>
                <p>
                  基于法律义务，您的个人数据可能会根据法律、法规或一个有权机关的决定而被披露。一般来说，我们承诺遵守所有可能阻止、限制或规范信息或数据传播的法律规则。
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>数据保存期限</span>
                <p>
                  从您首次接触开始，包括仅为了准备报价或预约而 VMDL
                  律师事务所处理并保存您的数据。除了为了实现本政策所述目的外，不会保存超过所需时间。
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>数据传输至欧盟以外</span>
                <p>
                  VMDL律师事务所承诺遵守适用的法规，将数据传输到提供等同保护水平的国家，并在接收国未提供此类保护水平的情况下，获取CNIL的授权进行此类传输。
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>数据安全</span>
                <p>
                  VMDL律师事务所实施了所有适当的技术和组织措施，通过物理和逻辑安全手段，以保障对偶然或非法访问、披露、更改、丢失或破坏您的个人数据的风险级别相适应的安全水平。
                </p>
              </div>
              <div className="flex flex-col py-2">
                <span>请求</span>
                <p>
                  关于网站用户数据保护政策的任何请求，以及行使您的权利，您可以通过发送电子邮件到cabinet@vmdl.ai与律师事务所联系。
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Error: Invalid</div>;
    }
  };
  if (!data) {
    return null;
  }
  return (
    <div className="w-full h-fit bg-blanc">
      <div className="w-full h-fit flex items-center justify-start pl-[10%] bg-blanc">
        <h1 className="py-4 font-semibold">{title}</h1>
      </div>
      <div className="overflow-hidden bg-[url('/images/white.jpeg')] bg-cover px-[10%] py-4 h-full flex gap-2">
        <div className="w-1/3 h-full space-y-2">
          <div className=" bg-cyan-200/60 p-6 flex flex-col shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                I. {titleWebsite[langueCourante]}
              </h1>
            </div>
            <WebsiteContent />
          </div>
          <div className=" bg-rose-200/60 p-6 shadow-md">
            <div>
              <h1 className="sm:text-base text-[13px] border-1 border-b border-black pb-1 mt-3 font-semibold">
                {sectionII.title}
              </h1>
            </div>
            <div className="text-[11px] pt-2">{sectionII.content}</div>
          </div>
        </div>
        <div className="w-1/3 h-full space-y-2">
          <div className=" bg-cyan-200/60 p-6 flex flex-col shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                {sectionIII.title}
              </h1>
            </div>
            <div className="text-[11px] pt-2">{sectionIII.content}</div>
          </div>
          <div className=" bg-rose-200/60 p-6 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                {sectionIV.title}
              </h1>
            </div>
            <div className="text-[11px] pt-2">{sectionIV.content}</div>
          </div>
        </div>
        <div className="w-1/3 h-full space-y-2">
          <div className=" bg-cyan-200/60 p-6 shadow-md">
            <div>
              <h1 className="text-[13px] sm:text-base border-1 border-b border-black pb-1 mt-3 font-semibold">
                {sectionV.title}
              </h1>
            </div>
            <div className="text-[11px] pt-2">{sectionV.content}</div>
          </div>
          <DataPrivacyPolicy />
        </div>
      </div>
    </div>
  );
}
