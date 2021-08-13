<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\PropertyHasGroup */

$this->title = Yii::t('common', 'Update {modelClass}: ', [
    'modelClass' => 'Property Has Group',
]) . $model->id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('common', 'Property Has Groups'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('common', 'Update');
?>
<?= $this->render('@admin/themes/adminlte/views/layouts/_menu_apps') ?>
<div class="property-has-group-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
