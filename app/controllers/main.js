var users = [];
main();

function main() {
  // B1: Gọi API lấy danh sách người dùng
  apiGetUser().then(function (result) {
    // Tạo biến users nhận kết quả trả về từ API
    users = result.data;
    // Sau khi đã lấy được data từ API thành công
    // Duyệt mảng data và khởi tạo các đối tượng user
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      users[i] = new User(
        user.id,
        user.taiKhoan,
        user.hoTen,
        user.matKhau,
        user.email,
        user.loaiND,
        user.ngonNgu,
        user.moTa,
        user.hinhAnh
      );
    }
    // Gọi hàm display để hiển thị danh sách người dùng ra giao diện
    display(users);
  });
}

// biến kiểm tra sự kiện thêm hoặc update
var btnEdit = "";

// Hàm xử lý gọi API thêm người dùng
function addUser() {
  btnEdit = "add";
  // B1: DOM lấy value
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;
  var hinhAnh = document.getElementById("HinhAnh").value;
  // B2: Khởi tạo đối tượng user
  var user = new User(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  // kiểm tra các input
  if (btnEdit === "add") {
    var valid = validation();
    if (!valid) {
      alert("vui lòng nhập các giá trị");
      return;
    }
  }

  // B3: Gọi API thêm người dùng

  apiAddUser(user)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function display(users) {
  var html = "";
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${user.taiKhoan}</td>
        <td>
          ${user.matKhau}
        </td>
        <td>${user.hoTen}</td>
        <td>${user.email}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.loaiND}</td>
        <td>${user.moTa}</td>

        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            data-type="update"
            data-id="${user.id}"
          >
            Cập Nhật
          </button>
          <button
            class="btn btn-danger"
            data-type="delete"
            data-id="${user.id}"
          >
            Xoá
          </button>
        </td>
      </tr>
    `;
  }

  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

// Hàm xử lý gọi API xoá người dùng
function deleteUser(userId) {
  apiDeleteUser(userId)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// hàm hiện thông tin của người dùng lên form khi cập nhật
function showUpdateModal(userId) {
  // thay đổi text của modal heaing và mpdal foooter
  document.querySelector(".modal-title").innerHTML = "Chỉnh sửa thông tin";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="update"
    >
      Update
    </button>
    <button
      class="btn btn-secondary"
      data-dismiss="modal"
    >
      Huỷ
    </button>
  `;

  // Call API lấy người dùng
  apiGetUserDetail(userId)
    .then(function (result) {
      var user = result.data;
      document.getElementById("maUser").value = user.id;
      document.getElementById("TaiKhoan").value = user.taiKhoan;
      document.getElementById("HoTen").value = user.hoTen;
      document.getElementById("MatKhau").value = user.matKhau;
      document.getElementById("Email").value = user.email;
      document.getElementById("loaiNguoiDung").value = user.loaiND;
      document.getElementById("loaiNgonNgu").value = user.ngonNgu;
      document.getElementById("MoTa").value = user.moTa;
      document.getElementById("HinhAnh").value = user.hinhAnh;
    })
    .catch(function (error) {
      console.log(error);
    });

  resetForm();
  document.getElementById("TaiKhoan").disabled = true;
}

// hàm xử lý gọi API  cập nhật người dùng
function updateUser() {
  btnEdit = "edit";
  // B1: DOM lấy value
  var id = document.getElementById("maUser").value;
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;
  var hinhAnh = document.getElementById("HinhAnh").value;
  // B2: Khởi tạo đối tượng user
  var user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  // Kiểm tra các input
  if (btnEdit === "edit") {
    var valid = true;
    var tbTK = document.getElementById("tbTK");
    // Kiểm tra tài khoản người dùng
    apiGetUser().then(function (result) {
      // Tạo biến users nhận kết quả trả về từ API
      users = result.data;
    });
    if (!checkInput(taiKhoan)) {
      valvalidid = false;
      tbTK.innerHTML = "Tài khoản không được để trống";
    } else if (taiKhoan === users.taiKhoan) {
      valid = true;
      tbTK.innerHTML = "";
    } else {
      tbTK.innerHTML = "";
    }
  }

  // B3: Gọi API cập nhật người dùng đã chỉnh sửa
  apiUpdateUser(user)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}
