import { Navigate } from 'react-router-dom';

const NormalWrapper = ({ children }) => {
    const sub = localStorage.getItem("sub");
    const cleanedSub = sub && sub.replace(/^"|"$/g, ''); // Remove double quotes
    console.log("NormalWrapper - cleanedSub:", cleanedSub);
    console.log(cleanedSub === "normal");
    return cleanedSub === "normal" ? children : <Navigate to="/" />;
}

export default NormalWrapper;
