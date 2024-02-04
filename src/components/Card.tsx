
const Card = ({ style, isPomodoro, children }: { style: string; isPomodoro: boolean; children: React.ReactNode }) => {
    return <div className={`p-4 ${style} ${isPomodoro ? "bg-slate-900" : "bg-slate-600"}`}> {children} </div>;
};

export default Card;
