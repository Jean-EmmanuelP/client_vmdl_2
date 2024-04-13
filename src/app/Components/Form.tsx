import { motion } from "framer-motion";
import Arrow from "../assets/svg/Arrow";
import { useEffect, useState } from "react";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function FormContact() {
  const { data } = useData();
  const { langueCourante } = useSection();
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
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { nom_prenom, Numero_de_telephone, Courriel, Message, Envoyer } =
    data[langCode].contact;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [wasSended, setWasSended] = useState<boolean>(false);
  const { currentSection } = useSection();

  useEffect(() => {
    if (currentSection !== 5 && currentSection !== 6) {
      setWasSended(false);
    }
  }, [currentSection]);

  const validationMessages = {
    fr: {
      required: "Ce champ est obligatoire",
      email: "Adresse e-mail invalide",
      phone: "Doit être uniquement des chiffres",
    },
    en: {
      required: "This field is required",
      email: "Invalid email address",
      phone: "Must be digits only",
    },
    it: {
      required: "Questo campo è obbligatorio",
      email: "Indirizzo email non valido",
      phone: "Deve contenere solo cifre",
    },
    es: {
      required: "Este campo es obligatorio",
      email: "Dirección de correo inválida",
      phone: "Debe contener solo dígitos",
    },
    عربي: {
      required: "هذا الحقل مطلوب",
      email: "عنوان البريد الإلكتروني غير صالح",
      phone: "يجب أن يحتوي على أرقام فقط",
    },
    pt: {
      required: "Este campo é obrigatório",
      email: "Endereço de e-mail inválido",
      phone: "Deve conter apenas dígitos",
    },
    de: {
      required: "Dieses Feld ist erforderlich",
      email: "Ungültige E-Mail-Adresse",
      phone: "Muss nur Ziffern enthalten",
    },
    中文: {
      required: "此字段是必填项",
      email: "电子邮件地址无效",
      phone: "只能包含数字",
    },
  };
  const messages =
    validationMessages[langCode as keyof typeof validationMessages] ||
    validationMessages["fr"];
  const validationSchema = Yup.object({
    nom: Yup.string().required(messages.required),
    email: Yup.string().email(messages.email).required(messages.required),
    telephone: Yup.string()
      .matches(/^[0-9]+$/, messages.phone)
      .required(messages.required),
    message: Yup.string().required(messages.required),
  });
  const handleSubmit = async (values: {
    nom: string;
    email: string;
    telephone: string;
    message: string;
  }) => {
    const data = {
      nom: values.nom,
      email: values.email,
      telephone: values.telephone,
      message: values.message,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/send-mail";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.ok) {
      setWasSended(true);
      setTimeout(() => {
        setWasSended(false);
      }, 10000);
    } else {
      alert(
        "Erreur lors de l'envoi de l'e-mail. Veuillez réessayer plus tard."
      );
    }
  };
  return (
    <>
      {wasSended && (
        <div className="fixed bg-white py-[20%] px-[2%] w-1/2 h-1/2 border shadow-2xl rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-1 text-2xl z-10">
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-around">
            <div className="text-justify">
              Nous accusons bonne reception de votre message.
              <br />
              <br />
              Nous vous recontacterons dans les plus brefs delais
              <br />
              <br />A bientot !
            </div>
          </div>
          <div className="absolute bottom-4 right-4 w-12 h-12">
            <img src="/favicon/vmdl.ico" alt="" />
          </div>
        </div>
      )}
      <Formik
        initialValues={{ nom: "", email: "", telephone: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, touched, errors }) => (
          <Form
            className="flex flex-col gap-1 sm:gap-2 text-[14px] sm:text-[20px] sm:content leading-[26px] font-light"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1 sm:gap-2">
              <label htmlFor="nom">{nom_prenom}</label>
              <Field
                name="nom"
                type="text"
                className={`border sm:p-1 ${
                  touched.nom && errors.nom
                    ? "border-red-500"
                    : "hover:border-noir"
                }`}
              />
              {touched.nom && errors.nom && (
                <div className="text-red-500 text-xs sm:mt-1">{errors.nom}</div>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <label htmlFor="telephone">{Numero_de_telephone}</label>
              <Field
                name="telephone"
                type="text"
                className={`border sm:p-1 ${
                  touched.telephone && errors.telephone
                    ? "border-red-500"
                    : "hover:border-noir"
                }`}
              />
              {touched.telephone && errors.telephone && (
                <div className="text-red-500 text-xs sm:mt-1">
                  {errors.telephone}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <label htmlFor="email">{Courriel}</label>
              <Field
                name="email"
                type="email"
                className={`border sm:p-1 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "hover:border-noir"
                }`}
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-xs sm:mt-1">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <label htmlFor="message">{Message}</label>
              <Field
                name="message"
                as="textarea"
                className={`border h-12 sm:h-36 p-1 ${
                  touched.message && errors.message
                    ? "border-red-500"
                    : "hover:border-noir"
                }`}
              />
              {touched.message && errors.message && (
                <div className="text-red-500 text-xs sm:mt-1">
                  {errors.message}
                </div>
              )}
            </div>

            <div className="flex justify-center -mt-[10px] items-center">
              <motion.button
                data-clickable="true"
                key={`contact-button`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ y: "40px", opacity: 0, backgroundColor: "#FFFFFF" }}
                animate={{
                  y: "40px",
                  opacity: 1,
                  backgroundColor: isHovering ? "#F0F0F0" : "#FFFFFF",
                }}
                transition={{
                  backgroundColor: { delay: 0, duration: 0.3 },
                  delay: 0.7,
                  duration: 0.5,
                }}
                type="submit"
                className="text-[#181a1b] shadow-sm p-2 sm:p-4 w-[280px] text-[14px] tracking-wide sm:text-sm uppercase flex justify-center items-center"
              >
                <motion.span
                  animate={{ x: isHovering ? "0" : "8px" }}
                  transition={{ duration: 0.5 }}
                >
                  {Envoyer}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, paddingLeft: "0px" }}
                  animate={{
                    opacity: isHovering ? 1 : 0,
                    paddingLeft: isHovering ? "10px" : "0px",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Arrow />
                </motion.span>
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
