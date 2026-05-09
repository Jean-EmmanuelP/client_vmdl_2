import { motion, AnimatePresence } from "framer-motion";
import Arrow from "../assets/svg/Arrow";
import { useEffect, useState } from "react";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

type Status = "idle" | "sending" | "success" | "error";

const localized = {
  fr: {
    sending: "Envoi en cours…",
    successTitle: "Message reçu",
    successBody:
      "Nous accusons bonne réception de votre message et reviendrons vers vous dans les plus brefs délais.",
    errorTitle: "Échec de l'envoi",
    errorBody:
      "Une erreur est survenue. Vous pouvez réessayer ou nous écrire directement à cabinet@vmdl.ai.",
    closeAction: "Fermer",
    retryAction: "Réessayer",
  },
  en: {
    sending: "Sending…",
    successTitle: "Message received",
    successBody:
      "We acknowledge receipt of your message and will get back to you shortly.",
    errorTitle: "Sending failed",
    errorBody:
      "An error occurred. Please try again or write to us directly at cabinet@vmdl.ai.",
    closeAction: "Close",
    retryAction: "Try again",
  },
};

export default function FormContact() {
  const { data } = useData();
  const { langueCourante, currentSection } = useSection();
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
  const [status, setStatus] = useState<Status>("idle");

  const i18n =
    langCode === "en"
      ? localized.en
      : localized.fr;

  useEffect(() => {
    if (currentSection !== 5 && currentSection !== 6 && currentSection !== 7) {
      setStatus("idle");
    }
  }, [currentSection]);

  // Auto-close success modal after a few seconds.
  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(t);
  }, [status]);

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

  type Values = {
    nom: string;
    email: string;
    telephone: string;
    message: string;
  };

  const handleSubmit = async (
    values: Values,
    helpers: FormikHelpers<Values>
  ) => {
    // Show modal IMMEDIATELY, even before the network request.
    setStatus("sending");

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
      };
      if (json.ok === false) {
        throw new Error("API returned ok=false");
      }
      setStatus("success");
      helpers.resetForm();
    } catch (err) {
      console.error("[contact-form] failed:", err);
      setStatus("error");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <ContactModal status={status} i18n={i18n} onClose={() => setStatus("idle")} />

      <Formik<Values>
        initialValues={{ nom: "", email: "", telephone: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
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
                disabled={isSubmitting || status === "sending"}
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
                className="text-[#181a1b] shadow-sm p-2 sm:p-4 w-[280px] text-[14px] tracking-wide sm:text-sm uppercase flex justify-center items-center disabled:opacity-50"
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

function ContactModal({
  status,
  i18n,
  onClose,
}: {
  status: Status;
  i18n: typeof localized.fr;
  onClose: () => void;
}) {
  const open = status !== "idle";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-noir/50 backdrop-blur-sm"
          onClick={status !== "sending" ? onClose : undefined}
        >
          <motion.div
            key="contact-modal-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-blanc text-noir font-riviera w-[88%] max-w-[480px] px-8 py-10 sm:px-12 sm:py-14 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-6">
              <ModalIcon status={status} />
            </div>

            {status === "sending" && (
              <p className="text-center uppercase text-[11px] tracking-[0.3em] text-noir/60">
                {i18n.sending}
              </p>
            )}

            {status === "success" && (
              <>
                <h3 className="text-center uppercase text-[22px] sm:text-[26px] font-light tracking-[0.05em] mb-4">
                  {i18n.successTitle}
                </h3>
                <p className="text-center text-[14px] sm:text-[15px] leading-[1.65] font-light text-noir/75">
                  {i18n.successBody}
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={onClose}
                    data-clickable="true"
                    className="uppercase text-[11px] tracking-[0.3em] border border-noir/30 px-6 py-3 hover:bg-noir hover:text-blanc transition"
                  >
                    {i18n.closeAction}
                  </button>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <h3 className="text-center uppercase text-[22px] sm:text-[26px] font-light tracking-[0.05em] mb-4">
                  {i18n.errorTitle}
                </h3>
                <p className="text-center text-[14px] sm:text-[15px] leading-[1.65] font-light text-noir/75">
                  {i18n.errorBody}
                </p>
                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={onClose}
                    data-clickable="true"
                    className="uppercase text-[11px] tracking-[0.3em] border border-noir/30 px-6 py-3 hover:bg-noir hover:text-blanc transition"
                  >
                    {i18n.closeAction}
                  </button>
                  <a
                    href="mailto:cabinet@vmdl.ai"
                    data-clickable="true"
                    className="uppercase text-[11px] tracking-[0.3em] bg-noir text-blanc px-6 py-3 hover:opacity-80 transition"
                  >
                    cabinet@vmdl.ai
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalIcon({ status }: { status: Status }) {
  if (status === "sending") {
    return (
      <div className="w-12 h-12 rounded-full border border-noir/15 border-t-noir animate-spin" />
    );
  }
  if (status === "success") {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <motion.path
          d="M14 24.5L21 31.5L34 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </svg>
    );
  }
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="16" y1="16" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="16" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
