<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Daftarpoli extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('m_daftarpoli');
    }

    public function index()
    {
        $data['title'] = '';
        $data['js'] = 'daftarpoli';

        $this->load->view('header', $data);
        $this->load->view('pendaftaran/v_daftarpoli', $data);
        $this->load->view('footer', $data);
    }


    // public function load_poli()
    // {
    //     $data['polidata'] = $this->m_poli->get_join_data();
    //     echo json_encode($data);
    // }

    public function load_poliklinik()
    {
        $data['polidata'] = $this->m_daftarpoli->get_data_poli();
        echo json_encode($data);
    }

    public function load_datapoli()
    {
        $data['poliklinik'] = $this->m_daftarpoli->get_poliklinik_data();
        echo json_encode($data);
    }

    public function get_poliklinik_by_id() {
        $idPoliklinik = $this->input->post('idPoliklinik');
        
        if ($idPoliklinik) {
            $this->load->model('m_daftarpoli'); // Pastikan Anda sudah membuat model untuk poliklinik
            $dataPoliklinik = $this->m_daftarpoli->get_poliklinik_by_id($idPoliklinik);
            
            if ($dataPoliklinik) {
                echo json_encode(['poliklinikNama' => $dataPoliklinik->poliklinikNama]);
            } else {
                echo json_encode(['error' => 'Poliklinik tidak ditemukan']);
            }
        } else {
            echo json_encode(['error' => 'ID Poliklinik tidak valid']);
        }
    }
    
    
    public function create_data() {
        $idpasien = $this->input->post('txidpasien');
        $poli = $this->input->post('txpoli');
        
        // Get the queue number for the selected poli
        $nomor_antrian = $this->m_daftarpoli->get_nomor_antrian($poli);
    
        // Prepare data for saving
        $save_data = array(
            'antrianpoliNo' => $nomor_antrian,
            'antrianpoliIdPasien' => $idpasien,
            'antrianpoliDataId' => $poli,
            'antrianpoliStatus' => 0,
            'antrianpoliDaftar' => date('Y-m-d')
        );
    
        // Insert data into the database
        $insert_id = $this->m_daftarpoli->insert_data($save_data);
    
        // Return response based on the result
        if ($insert_id) {
            echo json_encode(array('status' => 'success', 'msg' => 'Antrian berhasil ditambahkan.'));
        } else {
            echo json_encode(array('status' => 'error', 'msg' => 'Gagal menyimpan Antrian.'));
        }
    }
    
    
        public function delete($id)
    {
        $this->load->model('m_daftarpoli');
        if ($this->m_pendaftaran->delete_data($id)) {
            echo json_encode(array('status' => 'success', 'msg' => 'Data berhasil dihapus.'));
        } else {
            echo json_encode(array('status' => 'error', 'msg' => 'Data tidak ditemukan atau gagal dihapus.'));
        }
    }
}
