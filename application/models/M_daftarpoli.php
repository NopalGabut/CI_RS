<?php
class M_daftarpoli extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function insert_data($data)
    {
        $this->db->insert('antrianpoli', $data);
        return $this->db->insert_id();
    }

//    public function get_join_data() 
//    {
//         $sql = " SELECT * FROM poliklinik 
//         JOIN poliklinikdata ON poliklinikDataId = poliklinikData_Id
//         WHERE poliklinikData_Id = 1 ORDER BY poliklinikId DESC";
//         $query = $this->db->query($sql);
//         return $query->result();
//    }

public function get_poliklinik_data() {
    $sql = "SELECT * FROM poliklinik order by poliklinikId desc";
    $query = $this->db->query($sql);
    return $query->result();
}

public function get_data_poli() {
    $sql = "SELECT * FROM poliklinikdata order by poliklinikDataId desc";
    $query = $this->db->query($sql);
    return $query->result();
}


    public function get_poliklinik_by_id($idPoliklinik) {
        $this->db->where('poliklinikId', $idPoliklinik);
        $query = $this->db->get('poliklinik'); // Ganti 'poliklinik' dengan nama tabel yang sesuai
        return $query->row(); // Mengembalikan data satu baris
    }

    public function get_nomor_antrian($poli) {
        // Define the current date
        $today = date('Y-m-d');
        
        // Query to get the maximum antrianpoliNo for the selected poli on the current date
        $this->db->select('COALESCE(MAX(antrianpoliNo) + 1, 1) as antrianpoliNo');
        $this->db->from('antrianpoli');
        $this->db->where('antrianpoliDataId', $poli);
        $this->db->where('antrianpoliDaftar', $today);
        $query = $this->db->get();
    
        return $query->row()->antrianpoliNo;
    }
    
}
