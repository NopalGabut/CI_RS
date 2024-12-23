<?php
class M_dashboard extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function insert_card($data)
    {
        return $this->db->insert('data_pasien', $data);
    }

    // public function get_data_umum()
    // {
    //     $today = date('Y-m-d');
    //     $sql = "SELECT * FROM antrianpoli 
    //         JOIN poliklinik ON poliklinikId = antrianpoliIdPasien
    //         JOIN poliklinikdata ON poliklinikdataId = antrianpoliDataId
    //         WHERE antrianpoliDataId = 1 
    //         AND DATE(antrianpoliDaftar) = '$today' 
    //         ORDER BY antrianpoliId DESC";
    //     $query = $this->db->query($sql);
    //     return $query->result();
    // }

    public function reset_count($tanggal)
    {
        $this->db->where('antrianpoliDaftar <', $tanggal);
        $this->db->update('antrianpoli', array('antrianPoliNo' => 0));
    }


    public function get_total_pasien()
    {
        return $this->db->count_all('poliklinik');
    }

    public function get_total_umum()
    {
        $this->db->where('antrianpoliDataId', 1);
        $this->db->where('DATE(antrianpoliDaftar)', date('Y-m-d'));
        return $this->db->count_all_results('antrianpoli');
    }

    public function get_total_gigi()
    {
        $this->db->where('antrianpoliDataId', 2);
        $this->db->where('DATE(antrianpoliDaftar)', date('Y-m-d'));
        return $this->db->count_all_results('antrianpoli');
    }

    public function get_total_gizi()
    {
        $this->db->where('antrianpoliDataId', 3);
        $this->db->where('DATE(antrianpoliDaftar)', date('Y-m-d'));
        return $this->db->count_all_results('antrianpoli');
    }
}
