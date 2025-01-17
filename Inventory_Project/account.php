<?php
/**
 * Created by PhpStorm.
 * User: Jomari Garcia
 * Date: 2/27/2020
 * Time: 10:59 AM
 */
include_once('includes/db_connection.php');
$db = new db_connection();

$ID = $_GET['ID'];

$db->db_select_customer_customer_id($ID);
?>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Jomari</title>

    <script src="js/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="css/bootstrap.css">
    <script src="js/bootstrap.js"></script>

    <script src="js/jquery.dataTables.js"></script>
    <link rel="stylesheet" href="css/jquery.dataTables.css">
    <script src="js/dataTables.buttons.js"></script>

    <link rel="stylesheet" type="text/css" href="fontawesome/css/all.css">
    <script src="fontawesome/js/all.js"></script>

    <link rel="stylesheet" type="text/css" href="css/design.css">
    <script src="js/myscript.js"></script>
</head>
<body class="container-fluid">
<br>
<br>
<div class="row">
    <div class="col-md-4">
        <div class="card bg-dark">
            <div class="card-header text-center text-white bg-dark">
                <h3 class="">Product</h3>
            </div>
            <div class="card-body" id="card_body">
                <hr>
                <div class="row">
                    <div class="col-md-12">
                        <form>
                            <label id="">Product name:
                                <select name="select_product" id="slc_product" onchange="showProduct(this.value)" class="btn btn-dark dropdown-toggle form-control" required>
                                    <option value="">Select Product</option>
                                    <?php $db->db_select_product(); ?>
                                </select>
                            </label>
                        </form>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-7">
                            <div id="txt_Amount">
                                <label id="lbl_Amount">Amount:
                                    <input type="text" class="form-control" id="txtAmount" name="fAmount" placeholder="Amount" value="" readonly required/>
                                </label>
                            </div>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out this field.</div>
                        </div>
                        <div class="col-md-5">
                            <label style="width: 100%" id="lblQty">Quantity:
                                <input type="number" class="form-control" id="txtQty" name="fQty" placeholder="Quantity" value="" max="100" min="1" disabled required/>
                            </label>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <div id="txt_Amount">
                                <label id="lbl_Amount">Total amount:
                                    <input type="text" class="form-control" id="txtTotalAmount" name="fTotalAmount" placeholder="Total amount" value="" readonly required/>
                                </label>
                            </div>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out this field.</div>
                        </div>
                        <div class="col-md-5">
                            <label id="lblDiscount">Discount:
                                <input type="text" class="form-control" id="txtDiscount" name="fDiscount" placeholder="Discount" required/>
                            </label>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer" id="card_footer">
                <button class="btn btn-block btn-dark" type="submit" id="btnInsertProduct" name="buttonInsertProduct">Insert</button>
            </div>
        </div>
    </div>
    <div class="col-md-8 text-center">
        <form id="" action="" method="POST">
            <h1 id="lblList"><?php $db->get_fullname(); ?></h1>
            <h1 id="lblList">Order List</h1>
            <div class="table-responsive-md" id="table_div">
                <table width="100%" class="table-bordered table-dark table-striped display" id="table_orders">
                    <thead>
                    <tr class="tableheaders">
                        <th class="linement"> Product Name </th>
                        <th class="linement"> Quantity </th>
                        <th class="linement"> Price </th>
                        <th class="linement"> Total Price </th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr class="tableheaders">
                        <th class="linement"> Product Name </th>
                        <th class="linement"> Quantity </th>
                        <th class="linement"> Price </th>
                        <th class="linement"> Total Price </th>
                    </tr>
                    </tfoot>
                    <tbody>
                    <?php $db->db_select_table_order_customer_id($ID); ?>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>
</body>
</html>
