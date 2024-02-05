const Backdrop = ({ onClick }: { onClick: () => void }) => {
    return <div className="block fixed top-0 left-0 w-full h-full" onClick={onClick}></div>;
};

export default Backdrop;
