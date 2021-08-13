<?php

use yii\helpers\Html;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $model common\models\SaleHeader */

$this->title = Yii::t('app', 'Create Sale Header');
 
?>
<?= $this->render('@admin/themes/adminlte/views/layouts/_menu_apps') ?>
<div class="sale-header-create" ng-init="Title='Sale Order'">

    <h1><?= Html::encode($this->title) ?></h1>

    <?php
    if(Yii::$app->session->get('theme')==1){
		echo  $this->render('__form', [
            'model' => $model,
        ]);
	}else{
		echo  $this->render('_form', [
            'model' => $model,
        ]);                 
    }
     ?>

</div>
<?PHP return Yii::$app->response->redirect(Url::to(['update', 'id' => $model->id])); ?>