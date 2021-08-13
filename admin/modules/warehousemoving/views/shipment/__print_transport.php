<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
 
$HeightContent              = '885px';
$Font_size_Content          = '16px';


?>
 
 
          
          
 

<!DOCTYPE html>
<html lang="en">
  <head>
 
</head>

<body>
    <table   border="0" cellpadding="0" cellspacing="0" style="width:100%; padding-bottom: 5px;">
        <tr>
            <td valign="bottom" >
                
                <img src="<?=$Company->logoViewer; ?>" style="width: 100px;">
             
            </td>
            <td valign="bottom" align="center" style="font-size: 12px;">
                
                <div class="col-sm-12" >
                
                    <h4 style="font-size: 18px;"><?=$Company->name; ?></h4><br>
                    
                     <span style="font-size: 14px;"><?=$Company->name_en; ?></span> <br>

                    <div style="font-size: 14px;">
                      <?=$Company->vat_address; ?>  อ.<?=$Company->vat_city; ?> จ.<?=$Company->vat_location; ?> <?=$Company->postcode; ?>
                      
                      <span style="font-size: 2px;"></span><br>

                      <?=$Company->phone; ?> <?=$Company->fax; ?> <?=$Company->mobile; ?><br> 
                    </div> 
                 
              </div>

            </td>
            <td align="center">
                <table style="width:100%; border: 1px solid #000; padding:10px; background-color: #ccc;" border="0" cellpadding="0" cellspacing="0" >
                    <tr>
                        <td>
                    
                        <span  >
                          ใบส่งสินค้า <br>
                            <br>
                        </span>
                            
                        </td>

                    </tr>
                    
                </table>  
                 
            </td>
        </tr>
        <tr>
            <td valign="bottom" colspan="2" width="500">
                <div class="row" >
                 
                </div>

            </td>
            <td valign="top">
                
                <table style="width:100%; border: 1px solid #000; font-size: 10px;" border="0" cellpadding="0" cellspacing="0">
                    <tr >
                        <td align="center" style="border-bottom: 1px solid #000; width: 50px; height: 40px;">
                            เลขที่<br>
                            No.<br>
                        </td>
                        <td align="center" style="border-bottom: 1px solid #000; border-left: 1px solid #000; width: 80px;">
                            <?= $model->DocumentNo ?> 
                            </td>
                    </tr>
                    <tr >
                        <td align="center" style=" height: 40px;">
                        วันที่<br>
                        Date.<br>
                        </td>
                        <td align="center" style="border-left: 1px solid #000;  ">
                            <?= date('d / m / Y',strtotime($model->PostingDate)) ?> 
                        </td>
                    </tr>    
                </table>

            </td>
        </tr>
    </table>
    <table style="width:100%; font-size: 30px;" border="0" cellpadding="0" cellspacing="0" >
        
        
        <tr>
            <td valign="top" colspan="3">
                <table width="100%"   border="0" cellpadding="0" cellspacing="0" >
                    <tr>
                        <td valign="top"  style="width:900px; border: 1px solid #000; padding: 15px 15px 0 15px;  height: 250px;">
                            <p style="margin-top: 0px;">
                               <?php 
                                     
                  

                                    // if($model->customer->province!='')
                                    // {
                                    //     $findProvince   = 'จ.'.$model->customer->provincetb->PROVINCE_NAME;

                                    //     if( strpos( $model->address, $findProvince )) {

                                    //         str_replace($model->address, 'จ.'.$model->customer->provincetb->PROVINCE_NAME, 'จ.'.$model->customer->provincetb->PROVINCE_NAME);
                                    //     }else {

                                    //         $model->address = $model->address.' '.$findProvince;

                                    //     }

                                        
                                    // }


                                    // if($model->customer->postcode!='')
                                    // {
                                    //     $findPost   = $model->customer->postcode;

                                    //     if( strpos( $model->address, $findPost )) {

                                    //         str_replace($model->address, $model->customer->postcode, $model->customer->postcode);
                                    //     }else {
                                    //         $model->address = $model->address.' '.$findPost;

                                    //     }
                                    // } 
                                   


                                    $address = $model->ship_address != '' 
                                                ? $model->ship_address
                                                : $model->customer->fullAddress['address'];
                                ?>     

                                <h3>ชื่อลูกค้า : <?= $model->customer->name ?></h3><br> <br>
                                ที่อยู่ : <?= wordwrap($address, 150, "<br/>\r\n") ?> <br>
                                
                                
                            </p>

                            <br>
                            

                            โทร : <?= $model->customer->phone ?> แฟกซ์ : <?= $model->customer->fax ?><br><br>
                             
                            <h3>ขนส่ง : <?= $model->transport != null ? $model->transport->name: '';?></h3>
                             
                            
                            
                                 
                        </td>
                     
                        <td  valign="top" style="border: 1px solid #000;">
                   
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr > 
                                    <td style="text-align: left; width: 100px;  font-size: 25px;   padding:5px 0 0 5px; border-right: 1px solid #000; height: 95px;">
                                        พนักงานขาย <br>
                                        SALESMAN<br>
                                    </td>
                                    <td style="text-align: center; width: 350px; font-size: 25px; padding:5px 0 0 5px; ">
                                        <?=$model->order->sales ? $model->order->sales->name : '';?>
                                    </td>
                                </tr>
                                <tr  > 
                                    <td style="text-align: left; width: 320px;  font-size: 25px; padding:5px 0 0 5px; border-top: 1px solid #000;border-right: 1px solid #000; height: 95px;">
                                        เงื่อนไขการชำระะเงิน <br>
                                        TERM OF PAYMENT <br>
                                    </td>
                                    <td style="text-align: center; width: 350px;  font-size: 25px; padding:5px 0 0 5px; border-top: 1px solid #000;">
                                        
                                    </td>
                                </tr>
                                <tr > 
                                    <td style="text-align: left; width: 100px;  font-size: 25px; padding:5px 0 0 5px; border-top: 1px solid #000;border-right: 1px solid #000; height: 95px;">
                                        กำหนดส่งสินค้า <br>
                                        SHIP DATE (ว/ด/ป)<br>
                                    </td>
                                    <td style="text-align: center; width: 350px;  font-size: 25px; padding:5px 0 0 5px; border-top: 1px solid #000;">
                                        <h3><?=$model->order ? date('d / m / Y', strtotime($model->order->ship_date)) : '';?></h3>
                                    </td>
                                </tr>
                                <tr> 
                                    <td style="text-align: left; width: 100px;  font-size: 25px; padding:5px 0 0 5px; border-top: 1px solid #000;border-right: 1px solid #000; height: 95px;">
                                    <p style="margin-top: 3px;">
                                        ใบสั่งขาย เลขที่ <br>
                                        SO.NO.<br></p>
                                    </td>
                                    <td style="text-align: center; width: 350px;  font-size: 15pt; border-top: 1px solid #000; background-color:#ccc;">
                                        <h3><?=$model->order ? $model->order->no : '';?></h3>
                                    </td>
                                </tr>
                            </table>
                        </td>
                       
                    </tr>
                </table>
            </td>
        </tr>
        <tr><td colspan="3" style="height: 5px;"></td></tr>
        <tr>
            <td valign="top" colspan="3" style="height: <?=$HeightContent ?>; border-left: 1px solid 000; border-right: 1px solid 000;">

                <table class="layout" border="0" cellpadding="0" cellspacing="0"  width="100%"   >
                    <thead>
                        <tr >
                            <td class="thead" style="width:40px; height: 80px; text-align: center; border: 1px solid #000; font-size: 28px; ">ลำดับ</td>
                            <td class="thead"  style="width:130px; text-align: center; border: 1px solid #000;  font-size: 28px;">รหัสสินค้า</td>
                            <td class="thead"  style="width:298px; text-align: center; border: 1px solid #000;  font-size: 28px;">รายการ</td>
                            <td class="thead"  style="width:100px; text-align: center; border: 1px solid #000;  font-size: 28px;">จำนวน</td>
                            <td class="thead"  style="width:100px; text-align: center; border: 1px solid #000;  font-size: 28px;">หน่วย</td>
                           
                        </tr >
                    </thead>
                    <tbody >  
                        <?php 

                            
                            $td = '';
                            $i =0;
                            foreach ($dataProvider->models as $ship) {
                                $i++;

                                $Quantity = $ship->Quantity * -1;
                              
                                
                                // จำนวนต้องมากกว่า 0
                                // $WhLine  = \common\models\WarehouseMoving::find();
                                // $WhLine->where(['apply_to' => $ship->id]);
                                // $WSum = $WhLine->sum('Quantity');

                                // $WSum = $Quantity - $WSum;

                                // if($WSum > 0)
                                // {

                                    $td.= '<tr>';
                                        $td.= '<td class="layout" align="center" style="border-bottom: 1px solid #ccc; height:60px; font-size:28px;">'.$i.'</td>';
                                        $td.= '<td class="layout" style="padding-left:5px; border-bottom: 1px solid #ccc; font-size:28px;">'.$ship->itemstb->master_code.'</td>';

                                        if($ship->Description==''){
                                          
                                             $td.= '<td class="layout" style="padding-left:5px; border-bottom: 1px solid #ccc; font-size:28px;">'.$ship->itemstb->Description.'</td>';
                                          }else {
                                            
                                             $td.= '<td class="layout" style="padding-left:5px; border-bottom: 1px solid #ccc; font-size:28px;">'.$ship->Description.'</td>';
                                          }

                                       




                                        $td.= '<td class="layout" align="right" style="padding-right:5px; border-bottom: 1px solid #ccc; font-size:28px;">'.number_format($Quantity).' </td>';   


                                                                  
                                        $td.= '<td class="layout" align="center" style="padding-right:5px; border-bottom: 1px solid #ccc; font-size:28px;">'.$ship->itemstb->UnitOfMeasure.'</td>';

                               
                                    $td.= '</tr>';
                                //}
                            }
                            
                            echo $td;

    


                       
                             

                            
                        ?>
                    </tbody>
                       
                    </tr>

                    
                </table>
                  


            </td>

        </tr>
        <tr>
            <td colspan="3" style=" border-left: 1px solid 000; border-right: 1px solid 000; border-bottom:  1px solid 000;">

                <table border="0" cellpadding="0" cellspacing="0"  width="100%">
                    <tr>
                        <td valign="top" colspan="4" rowspan="2" style="border-top: 1px solid #000; padding:5px; font-size: 25px;" >
                            หมายเหตุ :<br>
                            REMARK<br><br>
                            <div style="">
                                 
                            </div>
                        </td>

                        <td colspan="2" style="width:160px; border-left: 1px solid #000; border-top: 1px solid #000; padding:5px; font-size: 25px;">
                            ราคารวม <br>
                            NET TOTAL <br>
                          <br>
                           
                        </td>
                        <td align="right" style="width:130px; padding-right:5px; border-left: 1px solid #000; border-top: 1px solid #000; font-size: 25px;" >
                         	
                        </td>
                       
                    </tr>

                
      

                    <tr>
                        <td   style="border-left: 1px solid #000; padding:5px; font-size: 25px;" valign="bottom"> 

                            ราคารวม <br>

                            ภาษีมูลค่าเพิ่ม VAT<br>

                        </td>
                        <td align="right" valign="bottom" style="font-size: 25px;" > </td>

                        <td align="right" style="padding-right:5px; border-left: 1px solid #000; font-size: 25px; width: 180px;" >
                            
                           

                             
                        </td>
                       
                    </tr>


                    <tr>
                        <td align="center" style="background-color: #ccc; border-top: 1px solid #000; border-right: 1px solid #000; font-size: 25px; height: 80px;" > 
                           <b> บาท <br>
                            BAT <br></b>
                        </td>
                         <td colspan="3" style="padding-left:5px; background-color: #ccc; border-top: 1px solid #000; font-size: 25px;">
                         
                         </td>
                         <td colspan="2" style="border-right: 1px solid #000; padding-left: 5px; font-size: 25px; background-color: #000; font-weight: bold; color:#FFF; border-top: 1px solid #000;">
                          จำนวนเงินรวมทั้งสิน <br>
                                  GRAND TOTAL <br>
                                </td> 
                        <td align="right" style="padding-right:5px; background-color: #ccc; border-top: 1px solid #000; font-size: 25px;">
                                                 
                        </td>
                    </tr>

                </table>
                       
            </td>
        </tr>
       
    </table>
    
    <table border="0" cellpadding="0" cellspacing="0" style="width:100%; padding-bottom: 5px;">
        <tr>    
            <td >
                <p style="font-size: 11px;"><br>
                
                   - หากมีปัญหาเกี่ยวกับตัวสินค้า โปรดติดต่อกลับทางบริษัทฯ ภายใน 7 วัน<br>
                   - กรณีชำระด้วยเช็คโปรดสั่งจ่าย และขีดคร่อมในนาม บริษัท จีโนล กรุ๊ป ซีที อิเล็คทริคฟิเคชั่น จำกัด เท่านั้น<br>
                   &nbsp;&nbsp;และการชำระเงินจะสมบูรณ์ต่อเมื่อเช็คนั้นเรียกเก็บจากธนาคารได้ครบถ้วนแล้ว<br>
                   - กรณีโอนเงิน โอนในนาม บริษัท จีโนล กรุ๊ป ซีที อิเล็คทริคฟิเคชั่น จำกัด ธนาคารกสิกรไทย สาขาถนนเศรษฐกิจ 1 บัญชีเลขที่ 464-1-02799-0
                 
                </p>
                
            </td>
        </tr>

        <tr>    
            <td >

                    <table width="100%" border="0" cellpadding="0">
                        <tr>
                            <td width="400">
                                
                                    <div  style="padding-top: 5px;">
                                        <span style="font-size: 12PX; text-align: center;">
                                        <p style="padding: 2px;">จ่ายชำระเงิน (...) เงินโอน  (...) เงินสด (...) เช็คเลขที่................. </p>
                                        <p>ลงวันที่...................ธนาคาร........................สาขา................ </p>
                                        <p>จำนวนเงิน.................... บาท (...........................................)</p>
                                        </span>
                                    </div>
                                 
                            </td>
                            <td align="center">
                                 <br>
                                
                                  
                                    ...........................................
                                      <p style="font-size: 10px;">
                                      ผู้สั่งขายสินค้า<br>
                                      AUTHORIZED SIGNATURE

                                      </p>
                                      </p>
                                </span>  
                                
                            </td>
                            <td align="center">
                                <br>
                                <div >
                                    <br><br>
                                    ...........................................
                                      <p style="font-size: 10px;">
                                      ผู้จัดสินค้า<br>
                                      AUTHORIZED SIGNATURE

                                      </p>
                                      </p>
                                </div>  
                            </td>
                            <td align="center">
                                <br>
                                <div >
                                    <br><br>
                                     ...........................................
                                      <p style="font-size: 10px;">
                                      ผู้รับมอบอำนาจ<br>
                                      AUTHORIZED SIGNATURE

                                      </p>
                                      </p>
                                </div>  
                            </td>






                        </tr>

                    </table>
                     
            </td>
        </tr>
    </table>  
<!-- <pagebreak /> -->
    




  </body>
</html>
 