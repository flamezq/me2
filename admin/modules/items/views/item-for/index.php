<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel admin\modules\items\models\ItemForSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('common', 'Item For Companies');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="item-for-company-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('common', 'Create Item For Company'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'item',
            'name',
            'create_date',
            'price',
            //'quantity',
            //'status',
            //'user_id',
            //'comp_id',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
