import { useLocation, useNavigate } from "react-router-dom";

export const useOpenModalPopup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const openPopup = (value: string) => {
        navigate(`/${value}`, {
            state: {
                backgroundLocation:
                    location.state?.backgroundLocation || location,
            },
        });
    };
    return { openPopup };
};
