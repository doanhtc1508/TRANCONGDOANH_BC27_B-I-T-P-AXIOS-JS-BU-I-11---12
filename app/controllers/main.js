main();
function main() {
  // B1: Gọi API lấy danh sách người dùng
  apiGetUser().then(function (result) {
    // Tạo biến users nhận kết quả trả về từ API
    var users = result.data;
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

// Hàm xử lý gọi API thêm người dùng
function addUser() {
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
  var valid = validation();

  if (!valid) {
    alert("vui lòng nhập các giá trị");
    return;
  }

  // B3: Gọi API thêm người dùng

  apiAddUser(user)
    .then(function (result) {
      // Thêm thành công, tuy nhiên lúc này dữ liệu chỉ mới được thay đổi ở phía server
      // Gọi tới hàm main để call API get users và hiển thị ra giao diện
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
  // DOM tới tbody và innerHTML bằng biến html
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

// Hàm xử lý gọi API xoá người dùng
function deleteUser(userId) {
  apiDeleteUser(userId)
    .then(function () {
      // Xoá thành công
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// hàm này dùng để cập nhật giao diện cho modal update và call API ấy chi tiết user để hiện lên giao diện
function showUpdateModal(userId) {
  // thay đổi text của modal heaing và mpdal foooter
  document.querySelector(".modal-title").innerHTML = "Chỉnh sửa thông tin";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="chinhSua"
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
      // thành công, fill data lên giao diện
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
}

// hàm xử lý gọi API  cập nhật người dùng
function updateUser() {
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
  var valid = validation();

  if (!valid) {
    alert("vui lòng nhập các giá trị");
    return;
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

// ham xu ly reset form va dong modal
function resetForm() {
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("MoTa").value = "";
  document.getElementById("HinhAnh").value = "";

  // Dong modal
  $("#myModal").modal("hide");
}

// ======DOM======
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  // Thay đổi text của modal heading
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="add"
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
}

// Uỷ quyền lắng nghe event của các button từ thẻ .modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
// Các hàm callback được gọi tới khi event được kích hoạt đồng thời nhận được 1 tham số là đối tượng Event
function handleSubmit(event) {
  var type = event.target.getAttribute("data-type");

  switch (type) {
    case "add":
      addUser();
      break;
    case "chinhSua":
      updateUser();
      break;
    default:
      break;
  }
}

// Uỷ quyền lắng nghe tất cả event của button Xoá và Cập nhật trong table cho tbody
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleUserAction);

function handleUserAction(event) {
  // Loại button (delete || update)
  var type = event.target.getAttribute("data-type");
  // Id của người dùng
  var id = event.target.getAttribute("data-id");

  switch (type) {
    case "delete":
      deleteUser(id);
      break;
    case "update":
      {
        // Cập nhật giao diện cho modal và call API get thông tin của người dùng và fill lên form
        showUpdateModal(id);
      }
      break;

    default:
      break;
  }
}

// hàm kiểm tra điều kiện các input
function validation() {
  // B1 : DOM lấy value từ inout
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;
  var hinhAnh = document.getElementById("HinhAnh").value;

  var valid = true;
  var tbTK = document.getElementById("tbTK");
  // Kiểm tra tài khoản người dùng
  apiGetUser().then(function (result) {
    // Tạo biến users nhận kết quả trả về từ API
    var users = result.data;
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (taiKhoan === user.taiKhoan) {
        tbTK.innerHTML = "Tài khoản đã tồn tại";
      }
    }
  });
  if (!checkInput(taiKhoan)) {
    valid = false;
    tbTK.innerHTML = "Tài khoản không được để trống";
  } else {
    tbTK.innerHTML = "";
  }

  // // kiểm tra tên người dùng
  var checkHoTen = new RegExp(
    "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW| ]+$"
  );
  var tbHoTen = document.getElementById("tbHoTen");
  if (!checkInput(hoTen)) {
    valid = false;
    tbHoTen.innerHTML = "Tên không được để trống";
  } else if (!checkHoTen.test(hoTen)) {
    valid = false;
    tbHoTen.innerHTML = "Tên người dùng không đúng kí tự";
  } else {
    tbHoTen.innerHTML = "";
  }

  // // kiểm tra password
  var pwPattern = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$"
  );

  var tbMatKhau = document.getElementById("tbMatKhau");

  if (!checkInput(matKhau)) {
    valid = false;
    tbMatKhau.innerHTML = "Nhập mật khẩu";
  } else if (!pwPattern.test(matKhau)) {
    valid = false;
    tbMatKhau.innerHTML =
      "Có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8 ";
  } else {
    tbMatKhau.innerHTML = "";
  }

  // // kiểm tra email
  var emailPattern = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  var tbEmail = document.getElementById("tbEmail");

  if (!checkInput(email)) {
    valid = false;
    tbEmail.innerHTML = "Điền Email không được để trống";
  } else if (!emailPattern.test(email)) {
    valid = false;
    tbEmail.innerHTML = "Email không đúng định dạng";
  } else {
    tbEmail.innerHTML = "";
  }

  // // kiểm tra ngày làm
  var tbHinhAnh = document.getElementById("tbHinhAnh");
  if (!checkInput(hinhAnh)) {
    valid = false;
    tbHinhAnh.innerHTML = "Thêm hình ảnh";
  }

  // // kiểm tra loại ND
  var tbLoaiND = document.getElementById("tbLoaiND");
  if (!checkInput(loaiND)) {
    valid = false;
    tbLoaiND.innerHTML = "Chọn chức vụ";
  } else if (loaiND === "Chọn loại người dùng") {
    valid = false;
    tbLoaiND.innerHTML = "Chọn chức vụ";
  } else {
    tbLoaiND.innerHTML = "";
  }

  // // kiểm tra loại ngôn ngữ
  var tbNgonNgu = document.getElementById("tbNgonNgu");
  if (!checkInput(ngonNgu)) {
    valid = false;
    tbNgonNgu.innerHTML = "Chọn ngôn ngữ";
  } else if (ngonNgu === "Chọn ngôn ngữ") {
    valid = false;
    tbNgonNgu.innerHTML = "Chọn ngôn ngữ";
  } else {
    tbNgonNgu.innerHTML = "";
  }

  // // kiểm tra mô tả
  var checkMoTa = new RegExp("^([a-zA-Z ]).{1,60}$");
  var tbMoTa = document.getElementById("tbMoTa");
  if (!checkInput(moTa)) {
    valid = false;
    tbMoTa.innerHTML = "Thêm mô tả";
  } else if (!checkMoTa.test(moTa)) {
    valid = false;
    tbMoTa.innerHTML = "Mô tả không  quá 60 kí tự";
  } else {
    tbMoTa.innerHTML = "";
  }

  return valid;
}

// hàm kiểm tra input có trống hay không
function checkInput(value) {
  if (!value) {
    return false;
  }
  return true;
}
