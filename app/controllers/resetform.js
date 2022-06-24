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

  // reset thông báo lỗi
  document.getElementById("tbTK").innerHTML = "";
  document.getElementById("tbHoTen").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbHinhAnh").innerHTML = "";
  document.getElementById("tbLoaiND").innerHTML = "";
  document.getElementById("tbNgonNgu").innerHTML = "";
  document.getElementById("tbMoTa").innerHTML = "";

  // Dong modal
  $("#myModal").modal("hide");
}
