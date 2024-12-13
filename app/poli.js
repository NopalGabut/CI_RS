function reset_form() {
	$(".reset-form").val("");
	load_poli()
}

// function openModal() {
// 	reset_form();
// 	$("#dataModal").modal("show");
// }

  function simpan_data() {
	let nama = $("#txnama").val();
	let ktp = $("#txktp").val();
	let alamat = $("#txalamat").val();
	let ttl = $("#txttl").val();
	let usia = $("#txusia").val();
	let keluhan = $("#txkeluhan").val();
	let kelamin = $("#txkelamin").val();
	let golongan = $("#txgolongan").val();
	let phone = $("#txphone").val();
	// let tujuanpoli = $("#txpoli").val();

	let formData = new FormData(); 
	formData.append("txnama", nama);
	formData.append("txktp", ktp);
	formData.append("txalamat", alamat);
	formData.append("txttl", ttl);
	formData.append("txusia", usia);
	formData.append("txkeluhan", keluhan);
	formData.append("txkelamin", kelamin);
	formData.append("txgolongan", golongan);
	formData.append("txphone", phone);
	// formData.append("txpoli", tujuanpoli);
	
	$.ajax({
		url: "poli/create_data",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function (data) {
			console.log(data.status);
			if (data.status === "error") {
				alert(data.msg);
			} else {
				toastr.success(data.msg);
                reset_form();
			}
		},
		error: function (xhr, status, error) {
			console.log(xhr.responseText);
			alert("Terjadi kesalahan saat meng-upload data.");
		},
	});
}

// let txpoliChoices;
// function load_poli() {
//   $.post("poli/load_poliklinik", function (res) {
// 	if (res && res.polidata && Array.isArray(res.polidata)) {
//       const $txpoli = $("#txpoli");
//       $txpoli.empty(); // Kosongkan dropdown

//       // Tambahkan opsi default
//       $txpoli.append('<option value="">Pilih Poliklinik</option>');

//       // Tambahkan opsi dari data pasien
//       $.each(res.polidata, function (i, v) {
//         $txpoli.append(
//           '<option value="' + v.poliklinikDataId + '">' + v.poliklinikDataNama+ "</option>"
//         );
//       });

//       // Re-initialize Choices.js jika digunakan
//       if (txpoliChoices) {
//         txpoliChoices.destroy();
//       }
//       txpoliChoices = new Choices($txpoli[0]);
//     } else {
//       console.error("Respon server tidak valid:", res);
//     }
//   }, "json");
// }

$(document).ready(function () {
    $(".angka").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and . 188 untuk koma
  
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	
	
	$(".btn-closed").click(function () {
		reset_form();
	});

	$(".btn-tambah").click(function () {
		$(".btn-submit").show();
		$(".btn-editen").hide();
	});
  
	// load_poli();
     
  });