<?php

namespace admin\modules\Manufacturing\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\ProductionOrder;

/**
 * ProductionSearch represents the model behind the search form of `common\models\ProductionOrder`.
 */
class ProductionSearch extends ProductionOrder
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'order_id', 'status', 'comp_id', 'user_id'], 'integer'],
            [['no', 'create_date', 'order_date'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = ProductionOrder::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'create_date' => $this->create_date,
            //'order_date' => $this->order_date,
            'order_id' => $this->order_id,
            'status' => $this->status,
            'comp_id' => $this->comp_id,
            'user_id' => $this->user_id,
        ]);
        
        $query->andFilterWhere(['like', 'no', $this->no]);
        if(isset($this->order_date)){
            $dateFilter     = explode(' - ', $this->order_date);
            //var_dump($dateFilter); 
            $query->andFilterWhere(['between', 'order_date', $dateFilter[0], $dateFilter[1]]);
        }
        return $dataProvider;
    }
}
