var baseUrl = "https://62adc4f8b735b6d16a397ff2.mockapi.io/api/users";

// Hàm call API lấy danh sách người dùng
function apiGetUser(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    // params: {
    //   name: search,
    // },
  });
}

// Hàm call API thêm người dùng
function apiAddUser(user) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: user,
  });
}

// Hàm call API xoá người dùng
function apiDeleteUser(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    method: "DELETE",
  });
}

// hàm call  API lấy chi tiết người dùng
function apiGetUserDetail(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    method: "GET",
  });
}

// hàm call API cập nhật người dùng đã chỉnh sửa
function apiUpdateUser(user) {
  return axios({
    url: `${baseUrl}/${user.id}`,
    data: user,
    method: "PUT",
  });
}
