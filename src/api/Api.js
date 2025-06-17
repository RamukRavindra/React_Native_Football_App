import axios from "axios";

const getFootBallData = async () => {
    try {
        const response = await axios
            .get("https://api.football-data.org/v4/competitions");
        const respData = {
            responseCode: response.status,
            response: response.data
        };
        return respData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export { getFootBallData };