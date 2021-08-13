<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\RuningNoseries */

$this->title = Yii::t('common', 'Update {modelClass}: ', [
    'modelClass' => 'Runing Noseries',
]) . $model->id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('common', 'Runing Noseries'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('common', 'Update');
?>
<div class="runing-noseries-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>