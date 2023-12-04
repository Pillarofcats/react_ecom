import { useEffect } from "react";

export default function ServerResponse({
  isServerMessage,
  setIsServerMessage,
  serverMessage,
  serverMessageStatus,
}: {
  isServerMessage: boolean;
  setIsServerMessage: React.Dispatch<React.SetStateAction<boolean>>;
  serverMessage: string;
  serverMessageStatus: "ok" | "err";
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsServerMessage(false);
    }, 4000);

    return () => {
      clearTimeout(timeout as NodeJS.Timeout);
    };
  }, [isServerMessage, setIsServerMessage]);

  return (
    <div className="self-center">
      {serverMessageStatus === "ok" ? (
        <div
          className={` font-semibold text-green-600 ${
            isServerMessage ? "visible" : "invisible"
          }`}>
          {serverMessage || "placeholder"}
        </div>
      ) : (
        <div
          className={` font-semibold text-red-600 ${
            isServerMessage ? "visible" : "invisible"
          }`}>
          {serverMessage || "placeholder"}
        </div>
      )}
    </div>
  );
}
