import CheckboxSettingItem from "./CheckboxSettingItem";
import { useGlobal } from "../hooks/Global";

const SettingItems = () => {
    const { global, setGlobalKey } = useGlobal();

    return (
        <div className="mt-[60px]">
            <CheckboxSettingItem
                title="Timer alarm"
                toggle={() => {
                    setGlobalKey("alarm", !global.alarm);
                }}
                globalState={global.alarm}
                offText="Off"
                onText="On"
            />
            <CheckboxSettingItem
                title="Clock direction"
                toggle={() => {
                    setGlobalKey("verticalClock", !global.verticalClock);
                }}
                globalState={global.verticalClock}
                offText="Horizontal"
                onText="Vertical"
            />
        </div>
    );
};

export default SettingItems;
