function updateTotalPasien() {
	$.ajax({
        url: "dashboard/count_data",
        method: "GET",
        success: function (response) {
            const data = JSON.parse(response);
            $("#total-pasien").text(data.total);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching total pasien:", error);
            alert("Gagal memuat total pasien. Silakan coba lagi nanti.");
        },
    });
}
function updateTotalumum() {
	$.ajax({
        url: "dashboard/count_umum", 
        method: "GET",
        success: function (response) {
            const data = JSON.parse(response);
            $("#total-umum").text(data.total);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching total umum:", error);
            alert("Gagal memuat total pasien umum. Silakan coba lagi nanti.");
        },
    });
}
function updateTotalgigi() {
	$.ajax({
        url: "dashboard/count_gigi",
        method: "GET",
        success: function (response) {
            const data = JSON.parse(response);
            $("#total-gigi").text(data.total);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching total gigi:", error);
            alert("Gagal memuat total pasien gigi. Silakan coba lagi nanti.");
        },
    });
}
function updateTotalgizi() {
	$.ajax({
        url: "dashboard/count_gizi", 
        method: "GET",
        success: function (response) {
            const data = JSON.parse(response);
            $("#total-gizi").text(data.total);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching total gizi:", error);
            alert("Gagal memuat total pasien gizi. Silakan coba lagi nanti.");
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
	updateTotalPasien();
});
