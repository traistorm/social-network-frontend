export const getCategoryPost = async () => {
    if (Cookies.get("token") != undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            "http://localhost:8080/api/category-post",
            headers
        );
    }
};