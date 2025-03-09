import { FailAllert } from "./FailAlert";
import { SuccessAlert } from "./SuccessAlert";

export const AlertMessage = ({
  messageError,
  setMessageError,
  messageSuccess,
  setMessageSuccess,
  className,
}) => {
  return (
    <div className={` ${className}`}>
      {(messageError && (
        <FailAllert setMessageError={setMessageError}>
          {messageError}
        </FailAllert>
      )) ||
        (messageSuccess && (
          <>
            <SuccessAlert setMessageSuccess={setMessageSuccess}>
              {messageSuccess}
            </SuccessAlert>
          </>
        ))}
    </div>
  );
};
