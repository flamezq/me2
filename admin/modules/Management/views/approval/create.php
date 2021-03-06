<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Approval */

$this->title = Yii::t('common', 'Create Approval');
$this->params['breadcrumbs'][] = ['label' => Yii::t('common', 'Approvals'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="approval-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
