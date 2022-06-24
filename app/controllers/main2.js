main();
function main() {
  // B1: Gọi API lấy danh sách sản phẩm
  apiGetUser().then(function (result) {
    // Tạo biến products nhận kết quả trả về từ API
    var users = result.data;
    // Sau khi đã lấy được data từ API thành công
    // Duyệt mảng data và khởi tạo các đối tượng Product
    var html = "";
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.loaiND === "GV") {
        html += `
        <div class="col col-12 col-sm-6 col-lg-3">
                  <div class="item animate__animated wow animate__backInLeft">
                    <div class="img">
                      <img src="${user.hinhAnh}" style="width: 100%" />
                    </div>
                    <div class="body">
                      <span>ITALIAN</span>
                      <h5 class="title">${user.hoTen}</h5>
                      <p class="text">
                      ${user.moTa}
                      </p>
                    </div>
                  </div>
                </div>
      `;
      }
    }
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    document.getElementById("rowshow").innerHTML = html;
  });
}
