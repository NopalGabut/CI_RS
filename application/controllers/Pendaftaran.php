<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pendaftaran extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('m_pendaftaran');
    }

    public function index()
    {
        $data['title'] = '';
        $data['js'] = 'pendaftaran';

        $this->load->view('header', $data);
        $this->load->view('pendaftaran/v_pendaftaran', $data);
        $this->load->view('footer', $data);
    }

    public function load_data()
    {
        $data['pendaftaran'] = $this->m_pendaftaran->get_data();
        echo json_encode($data);
    }

    public function load_poliklinik()
    {
        $data['polidata'] = $this->m_poli->get_data_poli();
        echo json_encode($data);
    }


    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM poliklinik WHERE poliklinikId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Data tidak ditemukan";
        }
        echo json_encode($res);
    }

    public function update_table()
{
    $id = $this->input->post('id');
    $poliklinikNama = $this->input->post('poliklinikNama');
    $poliklinikKtp = $this->input->post('poliklinikKtp');
    $poliklinikAlamat = $this->input->post('poliklinikAlamat');
    $poliklinikTempatLahir = $this->input->post('poliklinikTempatLahir');
    $poliklinikTanggalLahir = $this->input->post('poliklinikTanggalLahir');
    $poliklinikUsia = $this->input->post('poliklinikUsia');
    $poliklinikKeluhan = $this->input->post('poliklinikKeluhan');
    $poliklinikKelamin = $this->input->post('poliklinikKelamin');
    $poliklinikGolongan = $this->input->post('poliklinikGolongan');
    $poliklinikPhone = $this->input->post('poliklinikPhone');

    $formattedTanggalLahir = $this->format_tanggal($poliklinikTanggalLahir);

    $update_data = array(
        'poliklinikNama' => $poliklinikNama,
        'poliklinikKtp' => $poliklinikKtp,
        'poliklinikAlamat' => $poliklinikAlamat,
        'poliklinikTempatLahir' => $poliklinikTempatLahir,
        'poliklinikTanggalLahir' => $formattedTanggalLahir, 
        'poliklinikUsia' => $poliklinikUsia,
        'poliklinikKeluhan' => $poliklinikKeluhan,
        'poliklinikKelamin' => $poliklinikKelamin,
        'poliklinikGolongan' => $poliklinikGolongan,
        'poliklinikPhone' => $poliklinikPhone
    );

    
    $this->db->where('poliklinikId', $id);
    if ($this->db->update('poliklinik', $update_data)) {
        $res['status'] = 'success';
        $res['msg'] = "Data berhasil diperbarui";
    } else {
        $res['status'] = 'error';
        $res['msg'] = "Gagal memperbarui data";
    }

    echo json_encode($res);
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
