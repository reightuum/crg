import axios from "axios";

const BASE_URL = "https://arthurfrost.qflo.co.za";

export const fetchTimelineData = async () => {
    const response = await axios.get(`${BASE_URL}/php/getTimeline.php`);
    return response.data;
};
