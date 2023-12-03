export const getMessage = async (senderId, receiverId) => {
    if (Cookies.get("token") != undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            "http://localhost:8080/api/messages?senderId=" + senderId + "&receiverId=" + receiverId,
            headers
        );
    }
};

export const getRoomSendMessage = async (userId, receiverId) => {
    if (Cookies.get("token") != undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            "http://localhost:8080/api/rooms/get-room-send-message?userId=" + userId + "&receiverId=" + receiverId,
            headers
        );
    }
};

