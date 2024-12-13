function load_data() {
    $.post(
        "poligizi/load_data",
        {},
        function (data) {
            console.log("Data received:", data);
            $("#table1").DataTable().clear().destroy();
            $("#table1 > tbody").html("");
            let index = 1;
            const reversedData = data.poliumum.reverse();
            $.each(reversedData, function (idx, val) {
                html = "<tr>";
                html += "<td>" + val["antrianpoliNo"] + "</td>";
                html += "<td>" + val["poliklinikIdPasien"] + "</td>";
                html += "<td>" + val["poliklinikNama"] + "</td>";
                html += "<td>" + val["poliklinikDataNama"] + "</td>";
                html += '<td><span ' + (val["antrianpoliStatus"] != "2" ? 'onclick="status_data(' + val["antrianpoliId"] + ', ' + val["antrianpoliStatus"] + ')"' : '') + ' class="badge ' +
                    (val["antrianpoliStatus"] == "1" ? "bg-success" :
                        (val["antrianpoliStatus"] == "2" ? "bg-primary" : "bg-secondary")) + '">' +
                    (val["antrianpoliStatus"] == "1" ? "<i class='bi bi-clock'></i> Dilayani" :
                        (val["antrianpoliStatus"] == "2" ? "<i class='bi bi-check-circle'></i> Selesai" : "<i class='bi bi-hourglass-split'></i> Menunggu")) +
                    "</span></td>";
                html += "</tr>";
                $("#table1 > tbody").append(html);
                index++;
            });
        },
        "json"
    );
}



function status_data(id, status) {
    let actionText = "";
    let confirmButtonText = "";

    // Menentukan teks aksi dan tombol konfirmasi berdasarkan status
    if (status == 1) {
        actionText = "Selesaikan antrian?";
        confirmButtonText = "Ya, Selesaikan";
    } else if (status == 0) {
        actionText = "Pasien sedang dilayani?";
        confirmButtonText = "Ya, Dilayani";
    } else if (status == 2) {
        actionText = "Pasien harus menunggu kembali?";
        confirmButtonText = "Ya, Kembalikan";
    }

    // Konfirmasi dengan SweetAlert
    Swal.fire({
        title: "Konfirmasi",
        text: actionText,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonText: confirmButtonText,
    }).then((result) => {
        if (result.isConfirmed) {
            $.post(
                "poligizi/status_data",
                { id: id, status: status }, // Kirimkan status dalam request
                function (data) {
                    if (data.status === "success") {
                        Swal.fire({
                            title: "Sukses!",
                            text: data.msg,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            location.reload();
                            load_data();
                        });
                    } else {
                        Swal.fire({
                            title: "Gagal!",
                            text: data.msg,
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                },
                "json"
            );
        }
    });
}


$(document).ready(function () {
	$(".angka").keydown(function (e) {
		// Allow: backspace, delete, tab, escape, enter and . 188 untuk koma

		if (
			$.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: Ctrl+C
			(e.keyCode == 67 && e.ctrlKey === true) ||
			// Allow: Ctrl+X
			(e.keyCode == 88 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)
		) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if (
			(e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
			(e.keyCode < 96 || e.keyCode > 105)
		) {
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

	load_data();
});
