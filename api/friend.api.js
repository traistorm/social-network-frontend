export const getFriends = async (userId) => {
    if (Cookies.get("token") != undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            "http://localhost:8080/api/friends?userId=" + userId,
            headers
        );
    }
};

export const getFriendsOnline = async (userId) => {
    if (Cookies.get("token") != undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            "http://localhost:8080/api/friends/friends-online?userId=" + userId,
            headers
        );
    }
};