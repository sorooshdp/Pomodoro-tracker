const SettingItems = () => {
    return (
        <div className=" w-[100%] h-[100%] top-[60px] flex flex-col gap-y-[20px]">
            <div className="flex justify-between p-[12px] mt-[30px]">
                <label htmlFor="focus-length">Focus Length</label>
                <input type="number" />
            </div>
            <div className="flex justify-between p-[12px]">
                <label htmlFor="focus-length">Count to long break</label>
                <input type="number" />
            </div>
            <div className="flex justify-between p-[12px]">
                <label htmlFor="focus-length">Short break Length</label>
                <input type="number" />
            </div>
            <div className="flex justify-between p-[12px]">
                <label htmlFor="focus-length">Long break lenght</label>
                <input type="number" />
            </div>
        </div>
    );
};

export default SettingItems;
