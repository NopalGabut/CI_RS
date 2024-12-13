function load_data() {
	$.post(
		"dashboard/load_umum",
		{},
		function (data) {
			console.log("Data received:", data);
			$("#table1").DataTable().clear().destroy();
			$("#table1 > tbody").html("");
			let index = 1;
			const reversedData = data.umum.reverse();
			$.each(reversedData, function (idx, val) {
				html = "<tr>";
				html += "<td>" + val["antrianpoliNo"] + "</td>";
				html += "<td>" + val["poliklinikNama"] + "</td>";
				html +=
					"<td><span " +
					(val["antrianpoliStatus"] != "2"
						? 'onclick="status_data(' +
						  val["antrianpoliId"] +
						  ", " +
						  val["antrianpoliStatus"] +
						  ')"'
						: "") +
					' class="badge ' +
					(val["antrianpoliStatus"] == "1"
						? "bg-success"
						: val["antrianpoliStatus"] == "2"
						? "bg-primary"
						: "bg-secondary") +
					'">' +
					(val["antrianpoliStatus"] == "1"
						? "<i class='bi bi-clock'></i> Dilayani"
						: val["antrianpoliStatus"] == "2"
						? "<i class='bi bi-check-circle'></i> Selesai"
						: "<i class='bi bi-hourglass-split'></i> Menunggu") +
					"</span></td>";
                html += "</tr>";
				$("#table1 > tbody").append(html);
				index++;
			});
		},
		"json"
	);
}

function load_gigi() {
	$.post(
		"dashboard/load_gigi",
		{},
		function (data) {
			console.log("Data received:", data);
			$("#table2").DataTable().clear().destroy();
			$("#table2 > tbody").html("");
			let index = 1;
			const reversedData = data.gigi.reverse();
			$.each(reversedData, function (idx, val) {
				html = "<tr>";
				html += "<td>" + val["antrianpoliNo"] + "</td>";
				html += "<td>" + val["poliklinikNama"] + "</td>";
				html +=
					"<td><span " +
					(val["antrianpoliStatus"] != "2"
						? 'onclick="status_data(' +
						  val["antrianpoliId"] +
						  ", " +
						  val["antrianpoliStatus"] +
						  ')"'
						: "") +
					' class="badge ' +
					(val["antrianpoliStatus"] == "1"
						? "bg-success"
						: val["antrianpoliStatus"] == "2"
						? "bg-primary"
						: "bg-secondary") +
					'">' +
					(val["antrianpoliStatus"] == "1"
						? "<i class='bi bi-clock'></i> Dilayani"
						: val["antrianpoliStatus"] == "2"
						? "<i class='bi bi-check-circle'></i> Selesai"
						: "<i class='bi bi-hourglass-split'></i> Menunggu") +
					"</span></td>";
                html += "</tr>";
				$("#table2 > tbody").append(html);
				index++;
			});
		},
		"json"
	);
}

function load_gizi() {
	$.post(
		"dashboard/load_gizi",
		{},
		function (data) {
			console.log("Data received:", data);
			$("#table3").DataTable().clear().destroy();
			$("#table3 > tbody").html("");
			let index = 1;
			const reversedData = data.gizi.reverse();
			$.each(reversedData, function (idx, val) {
				html = "<tr>";
				html += "<td>" + val["antrianpoliNo"] + "</td>";
				html += "<td>" + val["poliklinikNama"] + "</td>";
				html +=
					"<td><span " +
					(val["antrianpoliStatus"] != "2"
						? 'onclick="status_data(' +
						  val["antrianpoliId"] +
						  ", " +
						  val["antrianpoliStatus"] +
						  ')"'
						: "") +
					' class="badge ' +
					(val["antrianpoliStatus"] == "1"
						? "bg-success"
						: val["antrianpoliStatus"] == "2"
						? "bg-primary"
						: "bg-secondary") +
					'">' +
					(val["antrianpoliStatus"] == "1"
						? "<i class='bi bi-clock'></i> Dilayani"
						: val["antrianpoliStatus"] == "2"
						? "<i class='bi bi-check-circle'></i> Selesai"
						: "<i class='bi bi-hourglass-split'></i> Menunggu") +
					"</span></td>";
                html += "</tr>";
				$("#table3 > tbody").append(html);
				index++;
			});
		},
		"json"
	);
}

function updateTotalPasien() {
	$.ajax({
		url: "dashboard/count_data", // Endpoint untuk mendapatkan jumlah data
		method: "GET",
		success: function (response) {
			// Parsing response JSON dari server
			const data = JSON.parse(response);
			// Mengubah teks pada elemen dengan id "total-pasien"
			$("#total-pasien").text(data.total);
		},
		error: function (xhr, status, error) {
			console.error("Error fetching total pasien:", error);
		},
	});
}
function updateTotalumum() {
	$.ajax({
		url: "dashboard/count_umum", // Endpoint untuk mendapatkan jumlah data
		method: "GET",
		success: function (response) {
			// Parsing response JSON dari server
			const data = JSON.parse(response);
			// Mengubah teks pada elemen dengan id "total-pasien"
			$("#total-umum").text(data.total);
		},
		error: function (xhr, status, error) {
			console.error("Error fetching total pasien:", error);
		},
	});
}
function updateTotalgigi() {
	$.ajax({
		url: "dashboard/count_gigi", // Endpoint untuk mendapatkan jumlah data
		method: "GET",
		success: function (response) {
			// Parsing response JSON dari server
			const data = JSON.parse(response);
			// Mengubah teks pada elemen dengan id "total-pasien"
			$("#total-gigi").text(data.total);
		},
		error: function (xhr, status, error) {
			console.error("Error fetching total pasien:", error);
		},
	});
}
function updateTotalgizi() {
	$.ajax({
		url: "dashboard/count_gizi", // Endpoint untuk mendapatkan jumlah data
		method: "GET",
		success: function (response) {
			// Parsing response JSON dari server
			const data = JSON.parse(response);
			// Mengubah teks pada elemen dengan id "total-pasien"
			$("#total-gizi").text(data.total);
		},
		error: function (xhr, status, error) {
			console.error("Error fetching total pasien:", error);
		},
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

	updateTotalgizi();
	updateTotalgigi();
	updateTotalumum();
	load_data();
	updateTotalPasien();
    load_gigi();
    load_gizi();
});
