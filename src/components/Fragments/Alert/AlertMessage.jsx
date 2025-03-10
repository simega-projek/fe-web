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

// paste on root component

// const [messageError, setMessageError] = useState(null);
// const [messageSuccess, setMessageSuccess] = useState(null);

{
  /* <AlertMessage
          className={"mt-5"}
          messageError={messageError}
          messageSuccess={messageSuccess}
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
        />
        */
}
