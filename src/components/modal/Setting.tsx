import ReactDOM from "react-dom";
import classes from "./Setting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Setting: React.FC = () => {
    const container = document.getElementById("modal")!;
    return ReactDOM.createPortal(
        <div>
            <div>
                <h3>Setting</h3>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <div>
                <label htmlFor=""></label>
                <input type="text" />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>,
        container
    );
};

export default Setting;
