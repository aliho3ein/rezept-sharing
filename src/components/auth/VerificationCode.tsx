import React, { useState, useRef } from "react";
import style from "../../styles/auth/verificationCode.module.scss";
import { alertMassage } from "../../actions/alerts";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../../api/instance";

const VerificationCode: React.FC = () => {
  const [verificationCodeForgotPassword, setVerificationCodeForgotPassword] =
    useState<string[]>(Array(6).fill(""));

  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const email = location.state.email;

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const updatedCode = [...verificationCodeForgotPassword];
      updatedCode[index] = value;
      setVerificationCodeForgotPassword(updatedCode);

      if (value.length === 1 && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.match(/\d/g) || [];

    if (digits.length > 0) {
      const updatedCode = Array.from(
        { length: 6 },
        (_, index) => digits[index] || ""
      );
      setVerificationCodeForgotPassword(updatedCode);

      const firstEmptyIndex = updatedCode.findIndex((digit) => digit === "");
      if (firstEmptyIndex !== -1) {
        inputRefs[firstEmptyIndex].current?.focus();
      }
    }

    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCodeForgotPassword.join("");

    instance
      .post(`/user/verifiziere-verifikationscode/${id}`, {
        verificationCodeForgotPassword: code,
      })
      .then((response) => {
        const data = response.data;

        if (response.status === 200) {
          alertMassage(data.message);
          navigate(`/passwort-zuruecksetzen/${id}`, {
            state: {
              id: data.user._id,
              email: data.user.email,
            },
          });
        } else {
          alertMassage(data.error || data.errors, "error");
        }
      })
      .catch((err) => {
        if (err.response) {
          const textError = err.response.data.error || err.response.data.errors;
          alertMassage(textError, "error");
        } else {
          alertMassage("Ein Fehler ist aufgetreten.", "error");
        }
      });
  };

  return (
    <div className={style.verificationCode}>
      <div className={style.cardForm}>
        <h2 className={style.cardTitle}>verifiziere Code</h2>
        <p className={style.cardBodyParagraph}>Bitte gib den Code ein</p>

        <p className={style.emailParagraph}>{email}</p>
        <form onSubmit={handleSubmit}>
          <div className={style.verificationInputs}>
            {verificationCodeForgotPassword.map((digit, index) => (
              <input
                ref={inputRefs[index]}
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={handlePaste}
                className={style.verificationInput}
                maxLength={1}
                required
              />
            ))}
          </div>
          <button className={style.btn} type="submit">
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
