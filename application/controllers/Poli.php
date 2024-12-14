<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Poli extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('m_poli');
    }

    public function index()
    {
        $data['title'] = '';
        $data['js'] = 'poli';

        $this->load->view('header', $data);
        $this->load->view('poli/v_formpasien', $data);
        $this->load->view('footer', $data);
    }

    public function load_data()
    {
        $data['poli'] = $this->m_poli->get_data();
        echo json_encode($data);
    }


    public function create_data()
    {

        $nama = $this->input->post('txnama');
        $ktp = $this->input->post('txktp');
        $alamat = $this->input->post('txalamat');
        $tempat = $this->input->post('txtempatlahir');
        $tanggal_input = $this->input->post('txtanggallahir');
        $tanggal = $this->format_tanggal($tanggal_input);
        $usia = $this->input->post('txusia');
        $keluhan = $this->input->post('txkeluhan');
        $kelamin = $this->input->post('txkelamin');
        $golongan = $this->input->post('txgolongan');
        $phone = $this->input->post('txphone');
        $sql = "SELECT IFNULL(
            (
                SELECT CONCAT(
                    'RSHM/', 
                    DATE_FORMAT(CURRENT_DATE(), '%m%d'), '/', 
                    LPAD(RIGHT(MAX(poliklinikIdPasien), 3) + 1, 3, '0')
                ) AS no_trans
                FROM poliklinik
                WHERE poliklinikIdPasien LIKE CONCAT(
                    'RSHM/', DATE_FORMAT(CURRENT_DATE(), '%m%d'), '/%')
                AND DATE_FORMAT(CURRENT_DATE(), '%d%m')
                ORDER BY poliklinikIdPasien DESC
                LIMIT 1
            ), 
            CONCAT('RSHM/', DATE_FORMAT(CURRENT_DATE(), '%m%d'), '/001')
        ) AS no_trans;";

        $no_trans = $this->db->query($sql)->row()->no_trans;


        $save_data = array(
            'poliklinikNama' => $nama,
            'poliklinikKtp' => $ktp,
            'poliklinikIdPasien' => $no_trans,
            'poliklinikAlamat' => $alamat,
            'poliklinikTempatLahir' => $tempat,
            'poliklinikTanggalLahir' => $tanggal,
            'poliklinikUsia	' => $usia,
            'poliklinikKeluhan' => $keluhan,
            'poliklinikKelamin' => $kelamin,
            'poliklinikGolongan' => $golongan,
            'poliklinikPhone' => $phone,
            'poliklinikDaftar' => date('Y-m-d')
        );

        $insert_id = $this->m_poli->insert_data($save_data);

        if ($insert_id) {
            echo json_encode(array('status' => 'success', 'msg' => 'Barang berhasil ditambahkan.'));
        } else {
            echo json_encode(array('status' => 'error', 'msg' => 'Gagal menyimpan data barang.'));
        }
    }

    private function format_tanggal($tanggal)
{
    $bulan = array(
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    );

    $tanggal = date('Y-m-d', strtotime($tanggal)); 
    $tanggal_parts = explode('-', $tanggal);

    $hari = $tanggal_parts[2];
    $bulan_text = $bulan[(int)$tanggal_parts[1] - 1];
    $tahun = $tanggal_parts[0];

    return "$hari $bulan_text $tahun";
}


    public function delete($id)
    {
        $this->load->model('m_pendaftaran');
        if ($this->m_pendaftaran->delete_data($id)) {
            echo json_encode(array('status' => 'success', 'msg' => 'Data berhasil dihapus.'));
        } else {
            echo json_encode(array('status' => 'error', 'msg' => 'Data tidak ditemukan atau gagal dihapus.'));
        }
    }
}
