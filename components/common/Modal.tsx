import ReactModal from "react-modal";
import { animated, useTransition } from "react-spring";

const centerStyles: ReactModal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#334155",
    border: "none",
    borderRadius: "25px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Modal = (props: ReactModal.Props) => {
  return <ReactModal {...props} style={{ ...centerStyles }} />;
};

export default Modal;
