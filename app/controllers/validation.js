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
    users = result.data;
  });
  if (!checkInput(taiKhoan)) {
    valid = false;
    tbTK.innerHTML = "Tài khoản không được để trống";
  } else if (!checkTaiKhoan(taiKhoan)) {
    valid = false;
    tbTK.innerHTML = "Tài khoản đã tồn tại";
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
function checkTaiKhoan(value, id) {
  var valid = true;

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (value === user.taiKhoan) {
      valid = false;
      break;
    }
  }
  return valid;
}
