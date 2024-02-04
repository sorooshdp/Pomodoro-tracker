
const Counter = ({ seconds }: { seconds: number }) => {
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    return (
        <div className="flex justify-center text-6xl">
            <span>
                {minutes} : {formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds}
            </span>
        </div>
    );
};

export default Counter;
