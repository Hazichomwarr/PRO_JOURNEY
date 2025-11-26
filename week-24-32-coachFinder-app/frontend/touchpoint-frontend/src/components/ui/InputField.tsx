//components/ui/InputField.tsx
import { ChangeEvent, useEffect, useState } from "react";
import ViewPasswordValue from "./ViewPasswordValue";
import zxcvbn from "zxcvbn";
import ShowPwdStrength from "./ShowPwdStrength";
import { useLocation } from "react-router-dom";

interface Props {
  type?: string;
  placeholder?: string;
  value?: string | number | undefined | null;
  error?: string | number | undefined | null;
  name?: string | undefined;

  changeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  value,
  changeFn,
  type,
  placeholder,
  error,
  name,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  console.log("is login page ->", isLoginPage);

  const isPasswordField = ["password", "confirmPassword"].includes(name || "");

  //pwd strength
  if (name === "password" && typeof value === "string") {
    useEffect(() => {
      const strength = zxcvbn(value);
      console.log("Pwd strength ->", strength);
      setScore(strength.score);
      setFeedback(
        strength.feedback.warning || strength.feedback.suggestions[0] || ""
      );
    }, [value]);
  }

  //Safe guarding input type
  const inputType = isPasswordField ? (isOpen ? "text" : "password") : type;

  const isFile = type === "file";

  return (
    <div className="felx flex-col gap-1 w-full">
      <div className="relative w-full">
        <input
          type={inputType}
          placeholder={name === "phone" ? "Phone: 000-000-0000" : placeholder}
          {...(!isFile ? { value: value ?? "" } : {})} // ⬅ do NOT control file input
          onChange={changeFn}
          className={`w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } `}
        />
        {isPasswordField && (
          <ViewPasswordValue isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
      {name === "password" && !isLoginPage && (
        <ShowPwdStrength score={score} feedback={feedback} />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
