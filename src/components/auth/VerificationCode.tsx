import React, { useState, useRef } from "react";
import style from "../../styles/auth/verificationCode.module.scss";
import { alertMassage } from "../../actions/alerts";
import { useNavigate } from "react-router-dom";

const VerificationCode: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );

  const navigate = useNavigate();
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const updatedCode = [...verificationCode];
      updatedCode[index] = value;
      setVerificationCode(updatedCode);

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
      setVerificationCode(updatedCode);

      const firstEmptyIndex = updatedCode.findIndex((digit) => digit === "");
      if (firstEmptyIndex !== -1) {
        inputRefs[firstEmptyIndex].current?.focus();
      }
    }

    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join("");
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/verify-verification-code//* ${email} */`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode: code,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alertMassage(data.message, "success");
        navigate(`/passwort-zuruecksetzen//* ${email} */`, {
          state: {
            username: data.user.username,
            email: data.user.email,
          },
        });
      } else {
        alertMassage(data.error || data.errors);
      }
    } catch (error) {
      console.error("Verification code validation error:", error);
    }
  };

  return (
    <div className={style.verificationCode}>
      <div className={style.cardForm}>
        <h2 className={style.cardTitle}>Verification Code</h2>
        <p className={style.cardBodyParagraph}>
          Please enter your Verification Code
        </p>

        {/* <p style={{ margin: "2rem", fontSize: "1.3rem" }}>{email}</p> */}
        <form onSubmit={handleSubmit}>
          <div className={style.verificationInputs}>
            {verificationCode.map((digit, index) => (
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
            <span className={style.text}>Confirm</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
