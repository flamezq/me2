<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Itemset */

$this->title = Yii::t('common', 'Create Itemset');
$this->params['breadcrumbs'][] = ['label' => Yii::t('common', 'Itemsets'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<?= $this->render('@admin/themes/adminlte/views/layouts/_menu_apps') ?>
<div class="itemset-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
