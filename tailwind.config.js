module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg-color)",
                txt: "var(--text-color)",
                prim: "var(--primary-color)",
                second: "var(--second-color)"
            },
        },
    },
    plugins: [],
};
