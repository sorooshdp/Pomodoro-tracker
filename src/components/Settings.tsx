import { memo, useCallback, useMemo } from "react";
import { useGlobal } from "../hooks/Global";
import Dialog from "./Dialog";
import { createPortal } from "react-dom";
import SettingItems from "./SettingItems";

const settingsDialogData = { w: 500, h: 600, title: "Settings" };

const Settings = memo(() => {
    const { global, setGlobalKey } = useGlobal();

    const settingsShowHandle = useCallback((newState: boolean) => {
        setGlobalKey("settingsShow", newState);
    }, []);

    const dialogChildren = useMemo(() => <SettingItems />, []);

    return createPortal(
        <>
            {global.settingsShow && (
                <div
                    className="z-[1200] absolute backdrop-blur-[2px] top-0 left-0 w-screen h-screen"
                    onClick={() => settingsShowHandle(false)}
                ></div>
            )}
            <Dialog data={settingsDialogData} show={global.settingsShow} setShow={settingsShowHandle}>
                {dialogChildren}
            </Dialog>
        </>,
        document.body
    );
});

export default Settings;
