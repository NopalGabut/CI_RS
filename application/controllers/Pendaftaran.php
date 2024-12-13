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
        $poliklinikTTL = $this->input->post('poliklinikTTL');
        $poliklinikUsia = $this->input->post('poliklinikUsia');
        $poliklinikKeluhan = $this->input->post('poliklinikKeluhan');
        $poliklinikKelamin = $this->input->post('poliklinikKelamin');
        $poliklinikGolongan = $this->input->post('poliklinikGolongan');
        $poliklinikPhone = $this->input->post('poliklinikPhone');
        // $poliklinikDataId = $this->input->post('poliklinikData_Id');

        $update_data = array(
            'poliklinikNama' => $poliklinikNama,
            'poliklinikKtp' => $poliklinikKtp,
            'poliklinikAlamat' => $poliklinikAlamat,
            'poliklinikTTL	' => $poliklinikTTL,
            'poliklinikUsia	' => $poliklinikUsia,
            'poliklinikKeluhan' => $poliklinikKeluhan,
            'poliklinikKelamin' => $poliklinikKelamin,
            'poliklinikGolongan' => $poliklinikGolongan,
            'poliklinikPhone' => $poliklinikPhone
            // 'poliklinikData_Id' => $poliklinikDataId
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
