<?php
class M_poli extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function insert_data($data)
    {
        $this->db->insert('poliklinik', $data);
        return $this->db->insert_id();
    }

   public function get_join_data() 
   {
        $sql = " SELECT * FROM poliklinik 
        JOIN poliklinikdata ON poliklinikDataId = poliklinikData_Id
        WHERE poliklinikData_Id = 1 ORDER BY poliklinikId DESC";
        $query = $this->db->query($sql);
        return $query->result();
   }

    public function get_data()
    {
        $sql = "SELECT * FROM poliklinik order by poliklinikId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function get_data_poli()
    {
        $sql = "SELECT * FROM poliklinikdata order by poliklinikDataId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }


    public function delete_data($id)
    {
        $this->db->where('poliklinikId', $id);
        return $this->db->delete('poliklinik');
    }
}
