<?php
class M_dashboard extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_card($data) {
        return $this->db->insert('data_pasien', $data);
    }

    public function get_data() {
        $sql = "SELECT * FROM data_pasien order by pasienId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function delete_card($id) {
        $this->db->where('pasienId', $id);
        return $this->db->delete('data_pasien');
    }
    public function get_total_pasien() {
        return $this->db->count_all('poliklinik'); 
    }

    public function get_total_umum() {
        $this->db->where('antrianpoliDataId', 1);
        return $this->db->count_all_results('antrianpoli');
    }
    
    public function get_total_gigi() {
        $this->db->where('antrianpoliDataId', 2);
        return $this->db->count_all_results('antrianpoli');
    }
    
    public function get_total_gizi() {
        $this->db->where('antrianpoliDataId', 3);
        return $this->db->count_all_results('antrianpoli');
    }
    

}