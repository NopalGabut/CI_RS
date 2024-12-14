<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Poliumum extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('m_poliumum');
    }

    public function index()
    {
        $data['title'] = '';
        $data['js'] = 'poliumum';

        $this->load->view('header', $data);
        $this->load->view('poli/v_poliumum', $data);
        $this->load->view('footer', $data);
    }

    public function load_data()
    {
        $data['poliumum'] = $this->m_poliumum->get_data();
        echo json_encode($data);
    }

    public function status_data()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");

        if ($status == 1) {
            $action = "Memanggil Pasien";
        } elseif ($status == 2) {
            $action = "Pelayanan Selesai";
        } else {
            $action = "unknown";
        }

        $isSuccess = $this->m_poliumum->active_data($id, $status);

        if ($isSuccess) {
            $res["status"] = "success";
            $res["msg"] = "Pasien " . $action;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Pasien " . $action;
        }

        echo json_encode($res);
    }
}
