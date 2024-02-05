const Clock = ({ seconds }: { seconds: number }) => {
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-[150px] font-[900] h-[150px]">{minutes < 10 ? `0${minutes}` : minutes}</div>
            <div className="text-[150px] font-[900] h-[200px] ">
                {formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds}
            </div>
        </div>
    );
};

export default Clock;
