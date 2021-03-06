<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\SaleGroup */

$this->title = Yii::t('common', 'Update {modelClass}: ', [
    'modelClass' => 'Sale Group',
]) . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('common', 'Sale Groups'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('common', 'Update');
?>
<div class="sale-group-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
