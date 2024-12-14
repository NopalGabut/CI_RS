function load_data(){
    $.post("pendaftaran/load_data", {}, function (data) {
        console.log('Data received:', data);
        $("#table1").DataTable().clear().destroy();
        $("#table1 > tbody").html(''); 
        let index = 1;
        const reversedData = data.pendaftaran.reverse();
        $.each(reversedData, function (idx, val) {
            html = '<tr>';
            html += '<td>' + index + '</td>';
			html += '<td>' + val['poliklinikNama'] + '</td>';
            html += '<td>' + val['poliklinikKtp'] + '</td>';
			html += '<td>' + val['poliklinikAlamat'] + '</td>';
			html += '<td>' + val['poliklinikIdPasien'] + '</td>';
            html += '<td>' + val['poliklinikTempatLahir'] + ', ' + val['poliklinikTanggalLahir'] +'</td>';
            html += '<td>' + val['poliklinikUsia']+'</td>';
            html += '<td>' + val['poliklinikKeluhan']+'</td>';
            html += '<td>' + val['poliklinikKelamin'] + '</td>';
            html += '<td>' + val['poliklinikGolongan'] + '</td>';
            html += '<td>' + val['poliklinikPhone'] + '</td>';
            html += '<td>' + val['poliklinikDaftar'] + '</td>';
            html += `
                <td>
                    <div class="d-flex flex-column">
                        <button class="btn btn-warning btn-sm mb-2 btn-edit" onclick="edit_data(${val["poliklinikId"]})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete" onclick="Delete(${val["poliklinikId"]})">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </td>`;
            html += '</tr>';
            $("#table1 > tbody").append(html);
            index++;
        });
        
        
    }, 'json');
  }

function edit_data(id) {
	$.post(
		"pendaftaran/edit_table",
		{ id: id },
		function (data) {
			$("#txnama").val(data.data.poliklinikNama);
			$("#txktp").val(data.data.poliklinikKtp);
			$("#txidpasien").val(data.data.poliklinikIdPasien);
			// load_poli(data.data.poliklinikData_Id);
			$("#txalamat").val(data.data.poliklinikAlamat);
			$("#txtempatlahir").val(data.data.poliklinikTempatLahir);
			$("#txtanggallahir").val(data.data.poliklinikTanggalLahir);
			$("#txkeluhan").val(data.data.poliklinikKeluhan);
			$("#txusia").val(data.data.poliklinikUsia);
			$("#txkelamin").val(data.data.poliklinikKelamin).change();
			$("#txgolongan").val(data.data.poliklinikGolongan);
			$("#txphone").val(data.data.poliklinikPhone);
			$("#dataModal").data("id", id);
			$("#dataModal").modal("show");
			$(".btn-editen").show();
		},
		"json"
	);
}


function update_data() {
	var id = $("#dataModal").data("id");
	let poliklinikNama = $("#txnama").val();
	let poliklinikKtp = $("#txktp").val();
	let poliklinikIdPasien = $("#txidpasien").val();
	// let poliklinikData_Id = $("#txpoli").val();
	let poliklinikAlamat = $("#txalamat").val();
	let poliklinikKeluhan = $("#txkeluhan").val();
	let poliklinikTempatLahir = $("#txtempatlahir").val();
	let poliklinikTanggalLahir = $("#txtanggallahir").val();
	let poliklinikUsia = $("#txusia").val(); 
	let poliklinikKelamin = $("#txkelamin").val();
	let poliklinikGolongan = $("#txgolongan").val();
	let poliklinikPhone = $("#txphone").val();
	


	let formData = new FormData();
	formData.append("id", id);
	formData.append("poliklinikNama", poliklinikNama);
	formData.append("poliklinikKtp", poliklinikKtp);
	formData.append("poliklinikIdPasien", poliklinikIdPasien);
	// formData.append("poliklinikData_Id", poliklinikData_Id);
	formData.append("poliklinikAlamat", poliklinikAlamat);
	formData.append("poliklinikTempatLahir", poliklinikTempatLahir);
	formData.append("poliklinikTanggalLahir", poliklinikTanggalLahir);
	formData.append("poliklinikKeluhan", poliklinikKeluhan);
	formData.append("poliklinikUsia", poliklinikUsia);
	formData.append("poliklinikKelamin", poliklinikKelamin);
	formData.append("poliklinikGolongan", poliklinikGolongan);
	formData.append("poliklinikPhone", poliklinikPhone);

	$.ajax({
        url: "pendaftaran/update_table",
        type: "POST",
        data: formData,
        contentType: false, 
        processData: false, 
        dataType: "json",
        success: function (data) {
            if (data.status === "success") {
                Swal.fire({
                    title: "Success!",
                    text: data.msg,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    $("#dataModal").modal("hide");
                    load_data(); 
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.msg,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}


  function openModal() {
	reset_form();
	$("#dataModal").modal("show");
}

function reset_form() {
	$(".reset-form").val("");
	$("#txkelamin").prop("selectedIndex", 0); 
    $("#txgolongan").prop("selectedIndex", 0);
}

function Delete(id) {
	$.confirm({
		title: "Konfirmasi",
		content: "Anda yakin ingin menghapus data ini?",
		buttons: {
			yes: {
				text: "Ya",
				action: function () {
					$.post(
						"pendaftaran/delete/" + id,
						function (data) {
							if (data.status === "success") {
								toastr.success(data.msg);
								load_data();
							} else {
								$.alert(data.msg);
							}
						},
						"json"
					);
				},
			},
			no: {
				text: "Tidak",
				action: function () {
				},
			},
		},
	});
}


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
  
	// load_poli()
    load_data();
     
  });