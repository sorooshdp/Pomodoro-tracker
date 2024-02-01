import ReactDOM from "react-dom";
import classes from "./Setting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../store/ui-context";

const Setting: React.FC<{ onClick: () => void }> = (props) => {
    const { theme, toggleTheme } = useTheme();

    const container = document.getElementById("modal")!;
    return ReactDOM.createPortal(
        <div className={classes.setting}>
            <div className={classes.flex}>
                <h3 className={classes.header}>Setting</h3>
                <FontAwesomeIcon
                    icon={faXmark}
                    className={classes.XMark}
                    onClick={props.onClick}
                />
            </div>
            <div className={classes.flex}>
                <label htmlFor="chageTheme">Dark mode</label>
                <input
                    type="checkbox"
                    id="changeTheme"
                    className={classes.checkbox}
                    checked={theme === "DARK" ? true : false}
                    onChange={toggleTheme}
                />
            </div>
            <div className={classes.flex}>
                <label htmlFor="">Focus length</label>
                <div>
                    <input type="number" />
                    <button>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </button>
                </div>
            </div>
            <div className={classes.flex}></div>
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
