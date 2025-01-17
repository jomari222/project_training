<?php
/**
 * Created by PhpStorm.
 * User: Jomari Garcia
 * Date: 3/9/2020
 * Time: 4:41 PM
 */
if(isset($_POST['buttonInsert_customer']))
{
    //Information
    $Add_Firstname = $_POST['fFirst_name'];
    $Add_Lastname = $_POST['fLast_name'];
    $Add_Storename = $_POST['fStore_name'];
    $Add_Phone_number = $_POST['fPhone_number_registration'];
    $Add_fUsername = $_POST['fUsername'];
    $Add_Password = $_POST['fPassword'];
    $Add_Position = 3;
    //Address
    $Add_Region = $_POST['select_region'];
    $Add_Province = $_POST['select_province'];
    $Add_City_mun = $_POST['select_city_mun'];
    $Add_Brgy = $_POST['select_brgy'];
    $Add_Address = $_POST['fAddress'];
    //Uppercase
    $Add_Firstname = strtoupper($Add_Firstname);
    $Add_Lastname = strtoupper($Add_Lastname);
    $Add_Storename = strtoupper($Add_Storename);
    //Regex
    $value_Add_Phone_number = preg_match("/^$|[0][9][0-9]{9}$/", $Add_Phone_number);
    $value_Add_Firstname = preg_match("/^[a-zA-Z ]+([a-zA-Z ]+)*[^\s]+$/", $Add_Firstname);
    $value_Add_Lastname = preg_match("/^[a-zA-Z]+([a-zA-Z]+)*[^\s]+$/", $Add_Lastname);
    $value_Add_Storename = preg_match("/^$|[a-zA-Z0-9' -]+([-][a-zA-Z0-9']+)*[^\s]+$/", $Add_Storename);
    $value_Add_Address = preg_match("/^[A-Za-z0-9 #]+$/", $Add_Address);
    $value_Add_fUsername = preg_match("/^[a-zA-Z0-9]+([_ a-zA-Z0-9]+)*[^\s]+$/", $Add_fUsername);
    $value_Add_Password = preg_match("/^[a-zA-Z0-9]+$/", $Add_Password);

    if($value_Add_Phone_number == 1 && $value_Add_Firstname == 1 && $value_Add_Lastname == 1 && $value_Add_Storename == 1 && $value_Add_Address == 1 && $value_Add_fUsername == 1 && $value_Add_Password == 1)
    {
        //Password
        $Add_Password = password_hash($Add_Password, PASSWORD_BCRYPT);

        //echo 'valid';
        include_once('db_connection_member.php');
        $db = new db_connection_member();
        $db->db_insert_account($Add_Firstname,$Add_Lastname,$Add_Phone_number,$Add_fUsername,$Add_Password,$Add_Position);
        $db->db_select_member($Add_fUsername);
        $db->db_insert_customer($Add_Firstname,$Add_Lastname,$Add_Storename,$Add_Phone_number,$Add_Region,$Add_Province,$Add_City_mun,$Add_Brgy,$Add_Address,$db->account_id);

        include_once('message.php');
        MessageGotoCustomerList('Registration Complete.');
    }
    else
    {
        session_start();
        session_destroy();
        header('Location: ../login_member.php');
    }
}
?>