<?php
class M_poligizi extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_data()
    {
        $today = date('Y-m-d');
        $sql = "SELECT * FROM antrianpoli 
     JOIN poliklinik ON poliklinikId = antrianpoliIdPasien
     JOIN poliklinikdata ON poliklinikdataId = antrianpoliDataId
     WHERE antrianpoliDataId = 3 
     AND DATE(antrianpoliDaftar) = '$today' 
     ORDER BY antrianpoliId DESC";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function delete_data($id)
    {
        $this->db->where('antrianpoliId', $id);
        return $this->db->delete('antrianpoli');
    }

    public function active_data($id)
    {

        $sql = "UPDATE antrianpoli 
  SET antrianpoliStatus = CASE 
   WHEN antrianpoliStatus = 0 THEN 1  
   WHEN antrianpoliStatus = 1 THEN 2  
   ELSE antrianpoliStatus  
  END 
  WHERE antrianpoliId = ?";

        return $this->db->query($sql, array($id));
    }
}
