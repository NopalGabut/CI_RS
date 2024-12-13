<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database(); 
        $this->load->model('m_dashboard');
    }

    public function index()
    {
        $data['title'] = '';
        $data['js'] = 'dashboard';

        $this->load->view('header', $data);
        $this->load->view('dashboard/v_dashboard', $data);
        $this->load->view('footer', $data);
    }

    public function load_umum()
    {
        $data['umum'] = $this->m_dashboard->get_data_umum();
        echo json_encode($data);
    }

    public function load_gigi()
    {
        $data['gigi'] = $this->m_dashboard->get_data_gigi();
        echo json_encode($data);
    }

    public function load_gizi()
    {
        $data['gizi'] = $this->m_dashboard->get_data_gizi();
        echo json_encode($data);
    }

    public function count_data() {
        $total = $this->m_dashboard->get_total_pasien(); 
        echo json_encode(['total' => $total]); 
    }
    public function count_umum() {
        $total = $this->m_dashboard->get_total_umum(); 
        echo json_encode(['total' => $total]); 
    }
    public function count_gigi() {
        $total = $this->m_dashboard->get_total_gigi(); 
        echo json_encode(['total' => $total]); 
    }
    public function count_gizi() {
        $total = $this->m_dashboard->get_total_gizi(); 
        echo json_encode(['total' => $total]); 
    }
}
?>